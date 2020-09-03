import Obstacle from "./Obstacle";
import ObstacleStorage  from "./ObstacleStorage";
import ObstacleManager from "./ObstacleManager";

class ObstacleFactory {
    private static _instance: ObstacleFactory;
    private storage = ObstacleStorage;

    create = ():number => {
        const obsNode = document.createElement("div");
        const obstacle: Obstacle = new Obstacle(obsNode);
        return this.storage.add(obstacle);
    };

    destroy = (obstacleId: number): void => {
        if(!this.storage.has(obstacleId)) return;
        if(ObstacleManager.isMoving(obstacleId)) ObstacleManager.stop(obstacleId);
        ObstacleManager.removeFromDisplay(obstacleId);
        this.storage.remove(obstacleId);
    };

    reset = () => {
        ObstacleManager.stopAll();
        ObstacleStorage.removeAll();
    };

    public static get Instance(){
        return this._instance || (this._instance = new this);
    }
}

export default ObstacleFactory.Instance;