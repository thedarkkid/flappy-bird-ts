import Bird from "./components/Bird";

export default class Controller {

    public static addObstacleAtMidEL = (fn: Function) => {
        document.addEventListener("obstacleAtMid", (e) => {fn(e)});
    };

    public static removeObstacleAtMidEL = (fn: Function) => {
        document.addEventListener("obstacleAtMid", (e) => {fn(e)});
    };

    public static addGameOverEl = (fn: Function) => {
        document.addEventListener("gameOver", () => {fn()});
    };

    public static removeGameOverEl = (fn: Function) => {
        document.addEventListener("gameOver", () => {fn()});
    };


}