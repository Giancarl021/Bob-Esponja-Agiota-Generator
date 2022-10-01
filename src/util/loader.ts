import ElementsContext from '../interfaces/Context';
import Events from '../services/events';

type EventsInstance = ReturnType<typeof Events>;

export default function (elements: ElementsContext, events: EventsInstance) {
    return async (image: string) => {
        const loaded = new Promise((resolve, reject) => {
            elements.inputImage.onload = resolve;
            elements.inputImage.onerror = reject;
        });

        elements.inputImage.src = image;

        await loaded;

        events.load();
    }
}