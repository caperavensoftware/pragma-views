export class DragManager {
    /**
     * Clone of item you want to drag that exists on the animation layer
     */
    clone;

    /**
     * If true, item can not move on x axis
     */
    lockX;

    /**
     * If true, item can not move on y axis
     */
    lockY;

    /**
     * @constructor
     */
    constructor() {
        this.animationLayer = document.getElementById("animation-layer");

        if (!this.animationLayer) {
            this.animationLayer = document.createElement("div");
            this.animationLayer.id = "animation-layer";
            this.animationLayer.classList.add("animation-layer");
            this.animationLayer.classList.add("hidden");
            document.body.appendChild(this.animationLayer);
        }

        this.lockX = false;
        this.lockY = false;
    }

    /**
     * @destroy
     */
    dispose() {
        this.inputListener.removeEvent(this.animationLayer, inputEventType.move);
        this.inputListener.removeEvent(this.animationLayer, inputEventType.drop);

        document.body.removeChild(this.animationLayer);
        this.animationLayer = null;
    }

    /**
     * Move into animation layer
     * @param element
     */
    startDrag(element, dimentions) {
        this.clone = element.cloneNode(true);
        this.clone.classList.add("drag-item");
        this.animationLayer.appendChild(this.clone);
        this.animationLayer.classList.remove("hidden");

        this.clone.style.setProperty("--x", dimentions.left);
        this.clone.style.setProperty("--y", dimentions.top);
        this.clone.style.setProperty("--width", dimentions.width);
        this.clone.style.setProperty("--height", dimentions.height);
    }

    /**
     * Move around in animation layer
     * @param element
     */
    move(x, y) {
        requestAnimationFrame(_ => {
            // clone can be removed before the animation frame returns
            if (!this.clone) {
                return;
            }

            if (!this.lockX) {
                this.clone.style.setProperty("--x", x);
            }

            if (!this.lockY) {
                this.clone.style.setProperty("--y", y);
            }
        });
    }


    /**
     * Remove from animation layer
     * @param element
     */
    drop() {
        this.animationLayer.classList.add("hidden");

        this.clone.classList.remove("drag-item");
        this.animationLayer.removeChild(this.clone);
        this.clone = null;
    }

    /**
     * get the render dimentions of a element
     * @param element
     * @returns {Promise}
     */
    getDimentions(element) {
        return new Promise(resolve => requestAnimationFrame(_ => resolve(element.getBoundingClientRect())))
    }
}
