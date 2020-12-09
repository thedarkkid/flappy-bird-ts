export default class GameStats{
    private _gravity: number ;
    private _speed: number ;
    private time: number = 0;
    private timerID:any = null;
    private canTime:boolean = false;
    private Instance: GameStats = null;

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

    run = (interval: number = 350)  => {
        this.canTime = true;
        this.startTimer(interval);
    };

    pause = () => {
        this.canTime = false;
        this.endTimer();
        this.timerID = null;
    };

    end = () => {
        this.pause();
        this.timerID = null;
        this.time = 0;
    };

    private startTimer = (interval: number) => {
        if(!this.canTime) return;
        this.time+= interval;
        this.timerID = setInterval( () => this.startTimer(interval), interval);
    };

    private endTimer = () => {
        clearInterval(this.timerID);
    }
}