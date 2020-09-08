
export default class Eventor {

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

    public static addKeyupEL = (fn: Function) => {
        document.addEventListener("keyup", (e) => {fn(e)});
    };

    public static removeKeyupEL = (fn: Function) => {
        document.addEventListener("keyup", (e) => {fn(e)});
    };

}