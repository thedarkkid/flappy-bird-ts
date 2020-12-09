import eventor from "../utils/Eventor";

export default class GameStats{
    private _gravity: number ;
    private _speed: number ;
    private time: number = 0;
    private timerID:any = null;
    private canTime:boolean = false;
    private Instance: GameStats = null;
    private jumps: number = 0;

    constructor (gravity?: number, speed?: number) {
        if(this.Instance === null) return this.init(gravity, speed);
        else return this.Instance;
    }

    private init(gravity: number, speed: number){
        this._gravity = gravity;
        this._speed = speed;
        this.Instance = this;
        return this;
    }

    run = (interval: number = 1000)  => {
        this.canTime = true;
        this.startTimer(interval);
        this.startJumpListener();
    };

    pause = () => {
        this.canTime = false;
        this.endTimer();
        this.stopJumpListener();
    };

    end = () => {
        this.pause();
        this.time = 0;
        this.jumps = 0;
    };

    private startTimer = (interval: number) => {
        if(!this.canTime) return;
        this.time+= interval;
        this.timerID = setInterval( () => this.startTimer(interval), interval);
    };

    private endTimer = () => {
        clearInterval(this.timerID);
        this.timerID = null;
    };

    private startJumpListener = () => {
        eventor.addBirdJumpEL((e: Event) => {
            this.jumps++;
        }, "birdJumped");
    };

    private stopJumpListener = () => {
        eventor.removeBirdJumpEL("birdJumped");
    };

    get Jumps(){
        return this.jumps;
    }

    get Score(){
        return Math.floor((this.time/1000)/((this._gravity*this._speed)+this.Jumps));
    }

}