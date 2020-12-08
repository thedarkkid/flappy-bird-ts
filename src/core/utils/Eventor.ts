
export default class Eventor {

    private static events: Map<string, EventListenerObject|EventListener> = new Map<string, EventListenerObject|EventListener>();

    public static addObstacleAtMidEL = (fn: Function, name: string) => {
        const eventHandler = Eventor.addEventHandler((e) => fn(e), name);
        document.addEventListener("obstacleAtMid", eventHandler);
    };

    public static removeObstacleAtMidEL = (name: string) => {
        const eventHandler = Eventor.getEventHandler(name);
        document.removeEventListener("obstacleAtMid", eventHandler);
    };

    public static addGameOverEl = (fn: Function, name: string) => {
        const eventHandler = Eventor.addEventHandler(() => {fn()}, name);
        document.addEventListener("gameOver", eventHandler);
    };

    public static removeGameOverEl = (name: string) => {
        const eventHandler = Eventor.getEventHandler(name);
        document.removeEventListener("gameOver", eventHandler);
    };

    public static addKeyupEL = (fn: Function, name: string) => {
        const eventHandler = Eventor.addEventHandler((e) => fn(e), name);
        document.addEventListener("keyup", eventHandler);
    };

    public static removeKeyupEL = (name:string) => {
        const eventHandler = Eventor.getEventHandler(name);
        document.removeEventListener("keyup", eventHandler);
    };

    public static dispatch = (event: Event) => {
        document.dispatchEvent(event);
    };

    private static addEventHandler = (fn: EventListener|EventListenerObject, name: string): EventListener | EventListenerObject => {
        Eventor.events.set(name, fn);
        return  Eventor.events.get(name);
    };

    private static removeEventHandler = (name: string) => {
        if (Eventor.events.has(name)) Eventor.events.delete(name);
    };

    private static getEventHandler = (name:string): EventListenerObject|EventListener => {
        if (Eventor.events.has(name)) return Eventor.events.get(name);
    }


}