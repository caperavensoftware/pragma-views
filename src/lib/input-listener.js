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
        this.clickEvents = ["click", "touchstart"];
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
        const fnName = `register${eventType}`;
        this[fnName](element, callback);
        this.eventMap.set(key, callback);
    }

    /**
     * Event is no longer required, remove it from the listener
     * @param element
     * @param eventType
     */
    removeEvent(element, eventType) {
        const key = `${element.id}.${eventType}`;

        const fnName = `unregister${eventType}`;
        this[fnName](element);
        this.eventMap.delete(key);
    }

    registerClick(element, callback) {
        element.addEventListener(this.clickEvents[+ this.isMobile], callback, this.eventOptions[+ this.isMobile]);
    }

    unregisterClick(element) {
        const key = `${element.id}.${inputEventType.click}`;

        if (this.eventMap.has(key)) {
            const callback = this.eventMap.get(key);
            element.removeEventListener(this.clickEvents[+ this.isMobile], callback);
        }
    }
}
