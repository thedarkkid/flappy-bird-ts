import Obstacle, {Factory, Manager} from "./components/Obstacle";
import Eventor from "./utils/Eventor";
import {birdControl, obstaclesControl, screenControl} from "./utils/Game";
import {Key} from "webpack-merge/dist/types";

const factory =  Factory;
const manager = Manager;
const eventor = Eventor;
const screen = screenControl;
const bird =  birdControl;
const obstacles =  obstaclesControl;


let gameOn: boolean = false;
let gameOnPause: boolean = false;
let gravity:number = 2;
let speed: number = 1; // Number between 1 & 3.

const obstacleAtMid = (e: CustomEvent<Obstacle>) => {
    obstacles.obstacleAtMid(e,endGame);
};

export const continueGame = () => {
    eventor.removeKeyupEL("continueGame");
    eventor.addKeyupEL(pauseGame, "pauseGame");
    manager.moveAll();
    obstacles.generateObstacles(speed); // Generate obstacles at a certain "speed", the higher the speed, the faster obstacles generate.
    bird.startMotion(gravity); // Enable "gravity". The higher gravity, the faster the bird drops.
    eventor.addGameOverEl(endGame, "endGame"); // Enable the event listener for the "isOver" event.
    eventor.addObstacleAtMidEL(obstacleAtMid, "obstacleAtMid"); // Enable the event listener for the "obstacleAtMid" event.
    gameOn = true; // Boolean value to signify game is playing.
};

export const startGame = () => {
    eventor.removeKeyupEL("startGame");
    screen.start();
    factory.reset(); // Clear all obstacles in the factory.
    bird.reset(); // Return the bird to its default height.

    continueGame();
};

export const pauseGame = (e: KeyboardEvent) => {
    if(e.key !== "Enter") return;
    stopGame();
    eventor.removeKeyupEL("pauseGame");
    screen.pause();
    eventor.addKeyupEL((e: KeyboardEvent) => {
        continueGame();
    }, "continueGame");
};

export const stopGame = () => {
    obstacles.stopGenerateObstacles(); // Stop the engine from generating more obstacles
    bird.stopMotion(); // Freeze the bird in place.
    eventor.removeGameOverEl("endGame"); // Remove event listener for the "isOver" events.
    eventor.removeKeyupEL("pauseGame");
    eventor.removeObstacleAtMidEL("obstacleAtMid"); // Remove event listener for the "obstacleAtMid" event.
    manager.stopAll(); // Stop all obstacles in place.
    gameOn = false;
    gameOnPause = true;
};

export const endGame = () => {
    stopGame();
    gameOnPause = false;
    restart();
};

export const restart = () => {
    screen.restart();
    eventor.addKeyupEL(startGame, "startGame");
};

export const waiting = () => {
    screen.waiting();
    eventor.addKeyupEL(startGame, "startGame");
};

export default {endGame, stopGame, startGame, continueGame, waiting}