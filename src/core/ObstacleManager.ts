import Obstacle from "./Obstacle";

class ObstacleManager {
    private static _instance: ObstacleManager;
    private obstacles: Map<number, Obstacle> = new Map<number, Obstacle>();

    move = () => {
        
    };
    public static get Instance(){
        return this._instance || (this._instance = new this())
    }

}
export default ObstacleManager.Instance