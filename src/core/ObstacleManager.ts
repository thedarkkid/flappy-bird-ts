import Obstacle from "./Obstacle";
import ObstacleStorage  from "./ObstacleStorage";
import ObstacleFactory from "./ObstacleFactory";

class ObstacleManager {
    private static _instance: ObstacleManager;
    private moving: Map<number, any> = new Map<number, any>();
    private display:HTMLDivElement;

    private constructor(_display: HTMLDivElement) {
        this.display = _display;
    }

    setDisplay = (_display: HTMLDivElement): void => {
        if(this.moving.size <= 0) { this.display = _display; return;}
        this.stopAll();
        this.display = document.querySelector('.game-container');
    };

    move = (obstacleId: number): void => {
        if(this.isMoving(obstacleId)) return;
        const obstacle: Obstacle = ObstacleStorage.get(obstacleId);

        const obstacleMoveId = setInterval( () => {
            obstacle.slide(2);
            if(obstacle.Out) {
                ObstacleFactory.destroy(obstacleId);
            }
        }, 20);

        this.moving.set(obstacleId, obstacleMoveId);
    };

    isMoving = (obstacleId: number): boolean => {
        return this.moving.has(obstacleId);
    };

    stop = (obstacleId: number): void => {
        if(!this.isMoving(obstacleId)) return;
        const moveId = this.moving.get(obstacleId);
        clearInterval(moveId);
        this.moving.delete(obstacleId);
    };

    stopAll = () => {
        this.moving.forEach( (moveId, obstacleId, moving) => {
            this.stop(obstacleId);
        });
        this.moving = new Map<number, any>();
    };

    addToDisplay = (obstacleId: number): void => {
        if(this.isMoving(obstacleId)) return;
        if(!ObstacleStorage.has(obstacleId)) return;
        this.display.appendChild(ObstacleStorage.get(obstacleId).Node);
    };

    removeFromDisplay = (obstacleId: number): void => {
        const obstacle = ObstacleStorage.get(obstacleId);
        obstacle.Node.remove();
        this.stop(obstacleId);
    };

    generateObstacle = () => {
        const obstacleId: number = ObstacleFactory.create();
        this.addToDisplay(obstacleId);
        this.move(obstacleId);
    };

    public static get Instance(){
        return this._instance || (this._instance = new this(document.querySelector('.game-container')))
    }

}
export default ObstacleManager.Instance