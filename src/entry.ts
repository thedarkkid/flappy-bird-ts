import "./style.scss";
import Obstacle,{Factory, Manager} from "./core/components/Obstacle";
import {birdControl, obstaclesControl} from "./core/Game";
import Eventor from "./core/Eventor";

document.addEventListener('DOMContentLoaded', () => {
    const factory =  Factory;
    const manager = Manager;
    const eventor = Eventor;

    const bird =  birdControl;
    const obstacles =  obstaclesControl;


    let gameOn: boolean = false;
    let gameOnPause: boolean = false;
    let gravity:number = 2;
    let speed: number = 1; // Number between 1 & 3.

    const obstacleAtMid = (e: CustomEvent<Obstacle>) => {
        obstacles.obstacleAtMid(e, endGame)
    };

    const continueGame = () => {
        manager.moveAll();
        obstacles.generateObstacles(speed); // Generate obstacles at a certain "speed", the higher the speed, the faster obstacles generate.

        bird.startMotion(gravity); // Enable "gravity". The higher gravity, the faster the bird drops.
        eventor.addGameOverEl(endGame); // Enable the event listener for the "gameOver" event.
        eventor.addObstacleAtMidEL(obstacleAtMid); // Enable the event listener for the "obstacleAtMid" event.
        gameOn = true; // Boolean value to signify game is playing.
    };

    const startGame = () => {
        factory.reset(); // Clear all obstacles in the factory.
        bird.reset(); // Return the bird to its default height.

        continueGame();
    };

    const stopGame = () => {
        bird.stopMotion(); // Freeze the bird in place.
        eventor.removeGameOverEl(endGame); // Remove event listener for the "gameOver" events.
        eventor.removeObstacleAtMidEL(obstacleAtMid); // Remove event listener for the "obstacleAtMid" event.
        manager.stopAll(); // Stop all obstacles in place.

        gameOn = false;
        gameOnPause = true;
        obstacles.stopGenerateObstacles(); // Stop the engine from generating more obstacles
    };

    const endGame = () => {
        stopGame();
        gameOnPause = false;
    };

    startGame();
});