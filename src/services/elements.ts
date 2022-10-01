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
    fileInput: null,
    outputImage: null,
    modalContainer: null,
    modalCloseButton: null,
    modalProgressBar: null
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
        context.outputImage = document.querySelector('#output-image') as HTMLInputElement;
        context.modalContainer = document.querySelector('.modal') as HTMLElement;
        context.modalCloseButton = context.modalContainer.querySelector('button') as HTMLButtonElement;
        context.modalProgressBar = context.modalContainer.querySelector('progress') as HTMLProgressElement;
    }

    return context as ElementsContext;
}