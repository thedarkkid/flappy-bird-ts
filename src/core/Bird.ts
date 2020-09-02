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
        if(this.bottom >= 495) return;
        this.bottom += 50;
        this.node_.style.bottom = this.bottom + 'px';
    };

    public fall = (gravity: number): void => {
        this.bottom -= gravity;
        this.node_.style.bottom = this.bottom + 'px';
    };

    private ctrlFly = (e:KeyboardEvent) =>{
        if(e.key === " ") this.fly();
    };

    public addFlyEL= (): void => {
        document.addEventListener('keyup', this.ctrlFly);
    }
}