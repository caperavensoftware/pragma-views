import {isMobile} from './device-helper';

/**
 * Find a element where dragging is started and ensure that it matches the given query
 * @param event
 * @param selectQuery
 * @returns {*}
 */
export function getEventTarget(event, selectQuery) {
    let x = 0;
    let y = 0;

    if (isMobile()) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    }
    else {
        x = event.clientX;
        y = event.clientY;
    }

    const topElement = document.elementFromPoint(x, y);

    if (selectQuery && !topElement.matches(selectQuery)) {
        return null;
    }

    return topElement;
}

/**
 * Given a element check if it is on top of a li element and if it is pass back that li
 * @param element
 * @returns {*}
 */
export function findParentLi(element) {
    if (!element) {
        return null;
    }

    if (element.tagName == "LI") {
        return element;
    }

    return findParentLi(element.parentElement);
}

/**
 * Get a li that you want to drag given a query to determine if the target touch point is valid
 * @param event
 * @param event
 * @returns {*}
 */
export function getValidLi(event, selectQuery) {
    const topElement = getEventTarget(event, selectQuery);
    return findParentLi(topElement);
}

/**
 * Create a highlight rect that is the same size as the given element
 * @param element
 */
export function createHighlightFor(element, dimentions, containerDimentions) {
    const highlight = document.createElement("DIV");
    highlight.classList.add('highlight');
    setStyleDimentions(highlight, dimentions, containerDimentions);

    return highlight;
}

/**
 * Update a style with the top, left, right and bottom properties of a bounding rect
 * @param element
 * @param dimentions
 */
export function setStyleDimentions(element, dimentions, containerDimentions) {
    element.style.setProperty("--left", dimentions.left);
    element.style.setProperty("--top", dimentions.top);
    element.style.setProperty("--width", dimentions.width);
    element.style.setProperty("--height", dimentions.height);
}

