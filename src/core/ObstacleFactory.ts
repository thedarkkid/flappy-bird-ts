import Obstacle from "./Obstacle";

class ObstacleFactory {
    private static _instance: ObstacleFactory;

    private obstacles:Map<number, Obstacle> = new Map<number, Obstacle>();
    private display:HTMLDivElement;
    private tally: number = 0;

    private constructor(_display: HTMLDivElement) {
        this.display = _display;
    }

    generate = ():number => {
        const obsNode = document.createElement("div");
        const obstacle = new Obstacle(obsNode);

        this.display.appendChild(obsNode);
        this.obstacles.set(++this.tally, obstacle);

        return this.tally;
    };

    public static get Instance(){
        return this._instance || (this._instance = new this(document.querySelector('.game-container')))
    }
}

export default ObstacleFactory.Instance;