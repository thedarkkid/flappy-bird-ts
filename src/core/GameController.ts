import Obstacle, {Factory, Manager} from "./components/Obstacle";
import Eventor from "./utils/Eventor";
import {birdControl, obstaclesControl, screenControl, statsControl} from "./utils/Game";

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

let stats = statsControl(gravity, speed);

const obstacleAtMid = (e: CustomEvent<Obstacle>) => {
    obstacles.obstacleAtMid(e,endGame);
};

export const pauseGame = (e: KeyboardEvent) => {
    if(e.key !== "Enter") return; // make sure the key hit is enter.
    stopGame(); // put the game on hold
    eventor.removeKeyupEL("pauseGame"); // remove the "pauseGame" event.
    screen.pause(); // pause the game screen.
    eventor.addKeyupEL(continueGame, "continueGame"); // add a "continueGame" event.
};

export const continueGame = () => {
    eventor.removeKeyupEL("continueGame"); // remove the "continueGame" event.
    eventor.addKeyupEL(pauseGame, "pauseGame"); // add the "pauseGame"  event.

    manager.moveAll(); // start moving the obstacles.
    bird.startMotion(gravity); // Enable "gravity". The higher gravity, the faster the bird drops.

    eventor.addGameOverEl(endGame, "endGame"); // Enable the event listener for the "isOver" event.
    eventor.addObstacleAtMidEL(obstacleAtMid, "obstacleAtMid"); // Enable the event listener for the "obstacleAtMid" event.

    // Generate obstacles at a certain "speed", the higher the speed, the faster obstacles generate.
    obstacles.reset();
    if(gameOnPause) setTimeout( () => obstacles.generateObstacles(speed), 500);
    else obstacles.generateObstacles(speed);

    gameOnPause = false; // Boolean value to signify game is not paused.
    gameOn = true; // Boolean value to signify game is playing.
};

export const startGame = () => {
    eventor.removeKeyupEL("startGame"); // remove "startGame" event.
    screen.start(); // Remove the game screen and add event listener.
    factory.reset(); // Clear all obstacles in the factory.
    bird.reset(); // Return the bird to its default height.
    obstacles.reset(); // Allow generation of obstacles.
    continueGame(); // Continue the game.
};

export const stopGame = () => {
    obstacles.stopGenerateObstacles(); // Stop the engine from generating more obstacles
    bird.stopMotion(); // Freeze the bird in place.
    eventor.removeGameOverEl("endGame"); // Remove event listener for the "isOver" events.
    eventor.removeKeyupEL("pauseGame");
    eventor.removeObstacleAtMidEL("obstacleAtMid"); // Remove event listener for the "obstacleAtMid" event.
    manager.stopAll(); // Stop all obstacles in place.
    gameOn = false; // Boolean value to signify game is not playing.
    gameOnPause = true; // Boolean value to signify game is paused.
};

export const endGame = () => {
    stopGame(); // Stop playing the game.
    gameOnPause = false; // Boolean value to signify that the game is paused.
    restart(); // Run restart function.
};

export const restart = () => {
    screen.restart(); // Show restart screen.
    eventor.addKeyupEL(startGame, "startGame"); // Add "startGame" event listener.
};

export const waiting = () => {
    screen.waiting(); // Show start screen.
    eventor.addKeyupEL(startGame, "startGame"); // Add "startGame" event listener.
};

export default {endGame, stopGame, startGame, continueGame, waiting}