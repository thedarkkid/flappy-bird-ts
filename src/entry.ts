import "./style.scss";
import {Factory, Manager} from "./core/components/Obstacle";
import Controller from "./core/Controller";
import {birdControl, obstaclesControl} from "./core/Game";
import Obstacle from "./core/components/obstacle/Obstacle";

// Check to use events to manage game over.
document.addEventListener('DOMContentLoaded', () => {
    const factory =  Factory;
    const manager = Manager;
    const game = Controller;

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
        obstacles.generateObstacles(speed); // Generate obstacles at a certain "speed", the higher the speed, the faster obstacles generate.

        bird.startMotion(gravity); // Enable "gravity". The higher gravity, the faster the bird drops.
        game.addGameOverEl(endGame); // Enable the event listener for the "gameOver" event.
        game.addObstacleAtMidEL(obstacleAtMid); // Enable the event listener for the "obstacleAtMid" event.
        gameOn = true; // Boolean value to signify game is playing.
    };

    const startGame = () => {
        factory.reset(); // Clear all obstacles in the factory.
        bird.reset(); // Return the bird to its default height.

        continueGame();
    };


    const stopGame = () => {
        bird.stopMotion(); // Freeze the bird in place.
        game.removeGameOverEl(endGame); // Remove event listener for the "gameOver" events.
        game.removeObstacleAtMidEL(obstacleAtMid); // Remove event listener for the "obstacleAtMid" event.
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