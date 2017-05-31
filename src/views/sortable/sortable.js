import {bindable} from 'aurelia-framework';

export class Sortable {
    @bindable items;

    constructor() {
        this.items = [];
        for (let i = 0; i < 1000; i++) {
            this.items.push(`Item number ${i}`);
        }
    }

    clone() {
        this.listElement = document.getElementById("list");
        const targetElement = document.getElementById("target");

        this.cloneList = list.cloneNode(true);
        this.cloneList.classList.add("list-clone");

        this.getDimentions(list).then(dimentions => {
            this.dimentions = dimentions;
            this.cloneList.style.setProperty("--top", dimentions.list.top);
            this.cloneList.style.setProperty("--left", dimentions.list.left);
            this.cloneList.style.setProperty("--right", dimentions.list.right);
            this.cloneList.style.setProperty("--bottom", dimentions.list.bottom);

            targetElement.appendChild(this.cloneList);
            targetElement.classList.remove("hidden");
            this.listElement.classList.add("hidden");
        });

        this.clickHandler = this.click.bind(this);
        this.cloneList.addEventListener("click", this.clickHandler);
    }

    getDimentions(list) {
        return new Promise(resolve => {
            let result = {};

            requestAnimationFrame(_ => {
                result.list = list.getBoundingClientRect();
                result.item = list.childNodes[0].getBoundingClientRect();

                resolve(result);
            });
        });
    }

    click(event) {
        const target = event.target;

        if (target.tagName !== "LI") {
            return;
        }
    }

    moveUp(item, children) {
        const index =  children.indexOf(item);

        if (index < 1) {
            return;
        }

        const itemToMove = children[index - 1];
        const duration = 300;
        itemToMove.classList.add("moving");
        itemToMove.style.setProperty("--duration", duration);
        itemToMove.style.setProperty("--top", this.dimentions.item.height);
    }

    moveDown(item, children) {

    }

    // this.dragItem = target;
    //
    // this.placeholder = document.createElement("li");
    // this.placeholder.classList.add("place-holder");
    // this.placeholder.style.setProperty("--height", this.dimentions.item.height);
    //
    // const children = Array.from(this.cloneList.childNodes);
    // this.moveUp(event.target);
    //
    // this.cloneList.replaceChild(this.placeholder, this.dragItem);

}
