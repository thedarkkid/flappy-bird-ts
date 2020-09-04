import Obstacle from "./Obstacle";


class ObstacleStorage {
    private static _instance: ObstacleStorage;
    private obstacles:Map<number, Obstacle> = new Map<number, Obstacle>();
    private tally: number = 0;

    add = (obstacle: Obstacle): number => {
        this.obstacles.set(++this.tally, obstacle);
        return this.tally;
    };

    get = (obstacleId: number): Obstacle => {
        return this.obstacles.get(obstacleId);
    };

    has = (obstacleId: number): boolean => {
        return this.obstacles.has(obstacleId);
    };

    remove = (obstacleId: number): boolean => {
        return this.obstacles.delete(obstacleId);
    };

    pop = (num?: number): Obstacle|null => {
        num = (num)? num : this.tally;
        if(num <= 0) return null;
        if(this.obstacles.has(num)) return this.obstacles.get(this.tally);
        else return this.pop(num-1);
    };

    forEach = (fn: (value?: Obstacle, key?:number, map?:Map<number, Obstacle>) => void): void => {
        this.obstacles.forEach( (obstacle, key, map) => {fn(obstacle, key, map)})
    };

    removeAll = (): void => {
        this.obstacles = new Map<number, Obstacle>();
    };

    get length(){
        return this.tally
    }

    public static get Instance(){
        return this._instance || (this._instance = new this())
    };
}

export default ObstacleStorage.Instance