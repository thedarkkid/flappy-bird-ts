export default class Obstacle{
    private node_: HTMLDivElement;
    private bottom: number =  Math.ceil(Math.random() * 60);
    private left: number = 500;

    constructor(_node: HTMLDivElement) {
        this.node_ = _node;

        this.node_.style.bottom = this.bottom + 'px';
        this.node_.style.left = this.left + 'px';
        this.node_.classList.add("obstacle");
    }
}