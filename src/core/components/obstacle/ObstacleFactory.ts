import Obstacle from "./Obstacle";
import ObstacleStorage  from "./ObstacleStorage";
import ObstacleManager from "./ObstacleManager";

class ObstacleFactory {
    private static _instance: ObstacleFactory;

    create = (top?: boolean):number => {
        const obsNode = document.createElement("div");
        const obstacle: Obstacle = new Obstacle(obsNode, top);
        return ObstacleStorage.add(obstacle);
    };

    destroy = (obstacleId: number): void => {
        if(!ObstacleStorage.has(obstacleId)) return;
        if(ObstacleManager.isMoving(obstacleId)) ObstacleManager.stop(obstacleId);
        ObstacleManager.removeFromDisplay(obstacleId);
        ObstacleStorage.remove(obstacleId);
    };

    destroyAll = (): void => {
        ObstacleStorage.forEach( (obs: Obstacle, obstacleId: number) => {
            this.destroy(obstacleId);
        });
    };

    reset = () => {
        this.destroyAll();
        ObstacleManager.stopAll();
        ObstacleStorage.removeAll();
    };

    latest = (): Obstacle => {
        return ObstacleStorage.pop();
    };

    public static get Instance(){
        return this._instance || (this._instance = new this);
    }
}

export default ObstacleFactory.Instance;