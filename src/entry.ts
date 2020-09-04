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
    let speed: number = 3;

    const obstacleAtMid = (e: CustomEvent<Obstacle>) => {
        obstacles.obstacleAtMid(e, endGame)
    };

    const startGame = () => {
        factory.reset();
        bird.reset();

        obstacles.generateObstacles(speed);

        bird.startMotion(gravity);
        game.addGameOverEl(endGame);
        game.addObstacleAtMidEL(obstacleAtMid);
        gameOn = true;
    };

    const stopGame = () => {
        bird.stopMotion();
        game.removeGameOverEl(endGame);
        game.removeObstacleAtMidEL(obstacleAtMid);
        manager.stopAll();

        gameOn = false;
        gameOnPause = true;
        obstacles.stopGenerateObstacles();
    };

    const endGame = () => {
        stopGame();
        gameOnPause = false;
    };

    startGame();
});