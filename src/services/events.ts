import { fabric } from 'fabric';

import ElementsContext from '../interfaces/Context';
import Dimensions from '../interfaces/Dimensions';
import Nullable from '../interfaces/Nullable';

import constants from '../util/constants';

interface Context {
    canvas: Nullable<fabric.Canvas>;
    base: Nullable<fabric.Image>;
    input: Nullable<fabric.Image>;
    originalDimensions: Nullable<Dimensions>;
    lastSize: Nullable<{ dimensions: Dimensions, ratio: number }>;
};

export default function (elements: ElementsContext) {
    const context: Context = {
        canvas: null,
        base: null,
        input: null,
        originalDimensions: null,
        lastSize: null
    };

    async function bootstrap() {
        await imageLoad();

        const canvas = new fabric.Canvas(elements.canvas);
    
        const base = new fabric.Image(elements.baseImage, {
            selectable: false,
            top: 0,
            left: 0
        });

        context.canvas = canvas;
        context.base = base;
        context.originalDimensions = {
            width: elements.handImage.width,
            height: elements.handImage.height
        };

        resize();

        canvas.add(base);

        base.sendToBack();
    
        elements.handImage.style.display = 'block';
    }

    function resize() {
        checkContext();
        const { dimensions, ratio } = calculateCanvasSize();

        context.base!.scale(ratio);

        elements.handImage.width = context.originalDimensions!.width * ratio;
        elements.handImage.height = context.originalDimensions!.height * ratio;

        context.canvas!.setDimensions(dimensions);
    }

    function render() {
        checkContext();

        context.canvas!.renderAll();
    }

    function load() {
        checkContext();

        if (context.input) {
            context.canvas!.remove(context.input);
        }

        const ratio = calculateInputRatio();

        const input = new fabric.Image(elements.inputImage, {
            selectable: true
        });

        context.canvas!.add(input);
        input.bringToFront();
        input.scale(ratio);
        context.canvas!.setActiveObject(input);
        
        context.input = input;
    }

    async function save() {
        checkContext();

        elements.modalProgressBar.style.display = 'block';
        elements.modalContainer.classList.add('is-active');

        let data: string;

        if (context.input) {
            const tempImage = new fabric.Image(elements.handImage, {
                height: context.originalDimensions!.height,
                width: context.originalDimensions!.width
            });

            tempImage.scale(context.lastSize!.ratio);

            context.canvas!.add(tempImage);

            tempImage.bringToFront();

            context.canvas!.renderAll();

            data = getData();

            context.canvas!.remove(tempImage);
            context.canvas!.setActiveObject(context.input);
        } else {
            data = getData();
        }

        const imageLoadingPromise = new Promise((resolve, reject) => {
            elements.outputImage.onload = resolve;
            elements.outputImage.onerror = reject;
        });

        elements.outputImage.src = data;

        await imageLoadingPromise;

        elements.modalProgressBar.style.display = 'none';

        function getData() {
            const multiplier = context.originalDimensions!.width / context.lastSize!.dimensions.width;

            return context.canvas!.toDataURL({
                format: constants.downloadMimeType,
                multiplier
            });
        }
    }

    function checkContext() {
        if (!context.canvas) {
            throw new Error('Canvas is not initialized');
        }
    }

    function calculateCanvasSize() {
        let { width, height } = elements.container.getBoundingClientRect();
        width -= constants.padding * 2;
        height -= constants.padding * 2;

        const ratio = Math.min(width / elements.baseImage.width, height / elements.baseImage.height);
        const size = {
            dimensions: {
                width: elements.baseImage.width * ratio,
                height: elements.baseImage.height * ratio
            },
            ratio
        };

        context.lastSize = size;

        return size;
    }

    function calculateInputRatio() {
        const { width: boundaryWidth, height: boundaryHeight } = elements.canvas.getBoundingClientRect();
        const { width, height } = elements.inputImage;

        if (width >= boundaryWidth || height >= boundaryHeight) {
            console.log({
                width,
                height,
                boundaryWidth,
                boundaryHeight
            })

            const ratio = Math.min((boundaryWidth - 20) / width, (boundaryHeight - 20) / height);

            return ratio;
        }

        return 1;
    }

    async function imageLoad() {
        const baseImagePromise = new Promise((resolve, reject) => {
            if (elements.baseImage.complete) return resolve(null);
            elements.baseImage.onload = resolve;
            elements.baseImage.onerror = reject;
        });

        const handImagePromise = new Promise((resolve, reject) => {
            if (elements.handImage.complete) return resolve(null);
            elements.handImage.onload = resolve;
            elements.handImage.onerror = reject;
        });

        await Promise.all([baseImagePromise, handImagePromise]);
    }

    return {
        bootstrap,
        resize,
        load,
        save,
        render,
    };
}