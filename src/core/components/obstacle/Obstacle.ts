import {getOAMEvent} from "../../Events";

export default class Obstacle{
    private readonly node_: HTMLDivElement;
    private readonly bottom: number =  Math.ceil(Math.random() * 60)+20;
    private left: number = 500;

    constructor(_node: HTMLDivElement) {
        this.node_ = _node;
        this.node_.style.bottom = this.bottom + 'px';
        this.node_.style.left = this.left + 'px';
        this.node_.classList.add("obstacle");
    }

    slide = (distance: number): void => {
        this.left -= distance;
        this.node_.style.left = this.left + 'px';
    };

    checkAtMid = () => {
        const event: CustomEvent<Obstacle> = getOAMEvent(this);
        if (this.MidInterface) document.dispatchEvent(event);
    };

    get Node(){
        return this.node_;
    };

    get Out(){
        return this.left <= -60;
    }

    get MidInterface(){
        return this.left > 200 && this.left < 280;
    }

    get Height(){
        return this.bottom+300;
    }
}