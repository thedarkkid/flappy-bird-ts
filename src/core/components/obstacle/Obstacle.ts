import {getOAMEvent} from "../../Events";

export default class Obstacle{
    private readonly node_: HTMLDivElement;
    private readonly bottom: number =  Math.ceil(Math.random() * 60)+20;
    private readonly top: boolean = false;
    private left: number = 500;
    private gap: number = 430;

        constructor(_node: HTMLDivElement, top?: boolean) {
        this.top = (top)? top : false;
        this.node_ = _node;
        this.bottom = (top)? this.bottom+this.gap: this.bottom ;
        this.node_.style.bottom = this.bottom + 'px';
        this.node_.style.left = this.left + 'px';

        const className: string = (top) ? "topObstacle" : "obstacle";
        this.node_.classList.add(className);
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
        return this.left > 195 && this.left < 280;
    }

    get Height(){
        return this.bottom+300;
    }

    get IsTop(){
        return this.top;
    }
}