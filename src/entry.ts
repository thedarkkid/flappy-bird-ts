import "./style.scss";
import Bird from "./core/Bird";
import ObstacleFactory from "./core/ObstacleFactory";
import ObstacleManager from "./core/ObstacleManager";

document.addEventListener('DOMContentLoaded', () => {
    let bird: Bird = new Bird(document.querySelector('.bird'));
    const factory =  ObstacleFactory;
    const manager = ObstacleManager;

    let birdMotionTimerID: any;
    let obstacleGeneratorTimerID: any;

    let gameOn: boolean = false;
    let gameOnPause: boolean = false;
    let gravity:number = 2;

    const startBirdMotion = () => {
        birdMotionTimerID = setInterval(() => {
            bird.fall(gravity);
            bird.addFlyEL();
        }, 20);
    };

    const stopBirdMotion =() => {
        bird.removeFlyEL();
        clearInterval(birdMotionTimerID);
    };

    const resetBird = () => {
        bird = new Bird(document.querySelector('.bird'));
    };

    const generateObstacles = () => {
        obstacleGeneratorTimerID = setInterval(() => {
            manager.generateObstacle();
            if(bird.Crashed) { endGame();}
        }, 3000);
    };

    const startGame = () => {
        // Clear all previous elements.
        factory.reset();
        resetBird();
        generateObstacles();

        startBirdMotion();
        gameOn = true;
    };

    const stopGame = () => {
        stopBirdMotion();
        manager.stopAll();

        gameOn = false;
        gameOnPause = true;

        clearInterval(obstacleGeneratorTimerID);
    };

    const endGame = () => {
        stopGame();
        gameOnPause = false;
    };

    startGame();
});