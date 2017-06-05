/**
 * Is a given point in a clip rect
 * @param vector2D, standard 2d vectory with x and y property
 * @param rect
 */
export function inBounds(vector2D, rect) {
    const x1 = rect.left;
    const x2 = rect.left + rect.width;
    const y1 = rect.top;
    const y2 = rect.top + rect.height;

    const inX = vector2D.x >= x1 && vector2D.x <= x2;
    const inY = vector2D.y >= y1 && vector2D.y <= y2;

    return inX && inY;
}