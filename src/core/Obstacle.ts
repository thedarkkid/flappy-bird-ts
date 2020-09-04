import {ObstacleAtMid} from "./events";

export default class Obstacle{
    private readonly node_: HTMLDivElement;
    private readonly bottom: number =  Math.ceil(Math.random() * 60);
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
        if (this.MidInterface) this.node_.dispatchEvent(ObstacleAtMid);
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