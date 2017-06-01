import {isMobile} from './device-helper';

/**
 * Define what events can be listened for
 * @type {{drag: number, move: number, drop: number, click: number, dblClick: number}}
 */
export const inputEventType = {
    drag: 'Drag',
    move: 'Move',
    drop: 'Drop',
    click: 'Click',
    dblClick: 'DblClick'
};

export class InputListener {
    /**
     * Store for events registered
     * The key is defined as a combination between the element id and even type
     * The content is a object literal defining the event being listened on and the callback to call
     * {
     *      event: event,
     *      callback: callback
     * }
     */
    eventMap;

    /**
     * Is this running on a mobile device nor not?
     * This will determine what events are used.
     */
    isMobile;

    /**
     * @constructor
     */
    constructor() {
        this.eventMap = new Map();
        this.isMobile = isMobile();
        this.eventTypeMap = new Map([
            [inputEventType.click, ["click", "touchstart"]]
        ]);

        this.eventOptions = [null, {passive: true}]
    }

    /**
     * @destructor
     */
    dispose() {
        this.eventMap.clear();
        this.eventMap = null;
    }

    /**
     * Add a new event to listen to and when it happens, use the defined callback
     * @param element
     * @param eventType
     * @param callback
     */
    addEvent(element, eventType, callback) {
        if (!element.id) {
            throw new Error("element should have a id");
        }

        const key = `${element.id}.${eventType}`;
        this.eventMap.set(key, callback);
        const eventName = this.eventTypeMap.get(eventType)[+ this.isMobile];
        element.addEventListener(eventName, callback, this.eventOptions[+ this.isMobile]);
    }

    /**
     * Event is no longer required, remove it from the listener
     * @param element
     * @param eventType
     */
    removeEvent(element, eventType) {
        const key = `${element.id}.${eventType}`;

        if (this.eventMap.has(key)) {
            const callback = this.eventMap.get(key);
            const eventName = this.eventTypeMap.get(eventType)[+ this.isMobile];
            element.removeEventListener(eventName, callback);
        }

        this.eventMap.delete(key);
    }
}
