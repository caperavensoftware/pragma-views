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
        this.eventTypeMap = new Map([
            [inputEventType.click, ["click", "touchstart"]],
            [inputEventType.drag, ["mousedown", "touchstart"]],
            [inputEventType.drop, ["mouseup", "touchend"]],
            [inputEventType.move, ["mousemove", "touchmove"]]
        ]);

        this.isMobile = isMobile();
        this.eventOptions = [null, {passive: true}];
    }

    /**
     * @destructor
     */
    dispose() {
        this.eventMap.clear();
        this.eventMap = null;

        this.eventTypeMap.clear();
        this.eventTypeMap = null;
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
        const fn = event => this.postProcessEvent(event, eventType, callback);
        this.eventMap.set(key, fn);
        const eventName = this.eventTypeMap.get(eventType)[+ this.isMobile];
        element.addEventListener(eventName, fn, this.eventOptions[+ this.isMobile]);
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

    /**
     * Pre process for callback and determine if callback is allowed or not
     * If no pre process is found callback will be allowed
     * @param event: event sent from input
     * @param eventType: event type that the event is registered on
     * @returns: boolean: true if you may continue, false to exit process
     */
    preProcess(event, eventType) {
        const fn = this[`pre${eventType}`];

        if (!fn) {
            return true;
        }

        return fn.call(this, event.target);
    }

    /**
     * perform a post process operation for a given event if there is one defined
     * @param event: event sent back from input
     * @param eventType: event type that the event is registered on
     * @param element: what element is the event bound to (not the target, but the registered element)
     * @param callback: what callback must be performed
     */
    postProcessEvent(event, eventType, callback) {
        if (!this.preProcess(event, eventType)) {
            return;
        }

        const mayContinue = callback(event);

        if (mayContinue === false) {
            return;
        }

        const fn = this[`post${eventType}`];
        if (fn) {
            fn.call(this, event.target);
        }
    }

    /**
     * Perform action on element after the drag event has fired
     * @param element
     */
    postDrag(element) {
        this.currentDraggedElement = element;
        this.currentDraggedElement.setAttribute('aria-grabbed', true);
    }

    /**
     * Perform this action before drop is executed to ensure that it is even relevant
     * @param element
     * @returns {boolean}
     */
    preDrop(element) {
        return this.currentDraggedElement != null;
    }

    /**
     * Perform action after the drop action has taken place.
     * this.currentDragElement is imporant in this case so that you don't have to keep track of who is being gragged.
     * When the drop event fires, the event.target indicates on what element the drop is taking place, ie: drop target.
     *
     * const dropTarget = event.target;
     * const dropSource = this.inputListener.currentDraggedElement;
     * see sortable.js on how this can be used
     * @param element
     */
    postDrop(element) {
        this.currentDraggedElement.setAttribute('aria-grabbed', false);
        this.currentDraggedElement = null;
    }

    /**
     * Perform this action before moving so that the move event only fires during dragging operations
     * @param element
     * @returns {boolean}
     */
    preMove(element) {
        return this.currentDraggedElement != null;
    }
}
