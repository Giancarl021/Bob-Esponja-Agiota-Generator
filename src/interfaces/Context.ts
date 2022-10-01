import { WithNullable } from './Nullable';

interface ElementsContext {
    canvas: HTMLCanvasElement;
    baseImage: HTMLImageElement;
    inputImage: HTMLImageElement;
    handImage: HTMLImageElement;
    container: HTMLElement;
    downloadButton: HTMLButtonElement;
    uploadButton: HTMLButtonElement;
    fileInput: HTMLInputElement;
}

export type NullableElementsContext = WithNullable<ElementsContext>;

export default ElementsContext;