import { NullableElementsContext } from './../interfaces/Context';
import ElementsContext from '../interfaces/Context';

const context: NullableElementsContext = {
    canvas: null,
    baseImage: null,
    inputImage: null,
    handImage: null,
    container: null,
    downloadButton: null,
    uploadButton: null,
    fileInput: null
};

export default function () {
    if (!context.container) {
        context.baseImage = document.querySelector('#base-image') as HTMLImageElement;
        context.inputImage = document.querySelector('#input-image') as HTMLImageElement;
        context.handImage = document.querySelector('#hand-image') as HTMLImageElement;
        context.canvas = document.querySelector('#editor') as HTMLCanvasElement;
        context.container = context.canvas.parentElement as HTMLElement;
        context.downloadButton = document.querySelector('#download-button') as HTMLButtonElement;
        context.uploadButton = document.querySelector('#upload-button') as HTMLButtonElement;
        context.fileInput = document.querySelector('#file-input') as HTMLInputElement;
    }

    return context as ElementsContext;
}