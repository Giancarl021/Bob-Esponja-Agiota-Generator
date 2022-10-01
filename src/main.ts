import 'bulma';
import './scss/main.scss';

import Elements from './services/elements';
import Events from './services/events';
import Input from './services/input';

import Loader from './util/loader';

async function main() {
    const elements = Elements();
    const events = Events(elements);
    const input = Input(Loader(elements, events));

    await events.bootstrap();

    window.onresize = events.resize;
    elements.downloadButton.onclick = events.save;

    elements.uploadButton.onclick = () => elements.fileInput.click();
    elements.fileInput.onchange = input.onInput.bind(elements.fileInput);
    document.onpaste = input.onPaste;
    document.ondrop = input.onDrop;

    document.ondragenter = input.preventEvent;
    document.ondragover = input.preventEvent;
    document.ondragleave = input.preventEvent;
}

document.addEventListener('DOMContentLoaded', main);