import {GameOverEvent} from "../utils/Events";
import eventor from "../utils/Eventor";

export default class Bird {
    private node_: HTMLDivElement;
    private bottom: number = 100;
    private left: number = 220;

    constructor (node_:HTMLDivElement){
        this.node_ = node_;
        this.node_.style.bottom = this.bottom + 'px';
        this.node_.style.left = this.left + 'px';
    }

    public fly = (): void => {
        if(this.bottom >= 495 || this.Crashed) return;
        this.bottom += 50;
        this.node_.style.bottom = this.bottom + 'px';
    };

    public fall = (gravity: number): void => {
        this.birdCrashed();
        this.bottom -= gravity;
        this.node_.style.bottom = this.bottom + 'px';
    };

    public birdCrashed = () => {
        if (this.Crashed) eventor.dispatch(GameOverEvent);
    };

    private ctrlFly = (e:KeyboardEvent) =>{
        if(e.key === " ") this.fly();
    };

    public addFlyEL= (): void => {
        eventor.addKeyupEL(this.ctrlFly, "ctrlFly")
    };

    public removeFlyEL = (): void => {
        eventor.removeKeyupEL("ctrlFly");
    };

    get Static(){
        return this.left === 220;
    };

    get Crashed(){
        return this.bottom <= 0;
    };

    get Altitude(){
        return this.bottom +150; // 150 = ground height, which bird < obstacle
    }
}