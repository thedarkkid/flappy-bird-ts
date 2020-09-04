import "./style.scss";
import Bird from "./core/components/Bird";
import ObstacleFactory from "./core/components/obstacle/ObstacleFactory";
import ObstacleManager from "./core/components/obstacle/ObstacleManager";
import Obstacle from "./core/components/obstacle/Obstacle";
import Controller from "./core/Controller";

// Check to use events to manage game over.
document.addEventListener('DOMContentLoaded', () => {
    let bird: Bird = new Bird(document.querySelector('.bird'));
    const factory =  ObstacleFactory;
    const manager = ObstacleManager;
    const game = Controller;

    let birdMotionTimerID: any;
    let obstacleGeneratorTimerID: any;

    let gameOn: boolean = false;
    let gameOnPause: boolean = false;
    let gravity:number = 2;

    const obstacleAtMid = (e: CustomEvent<Obstacle>) => {
        if(gameOver(e.detail)) endGame();
    };

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
        manager.generateObstacle();
        obstacleGeneratorTimerID = setInterval(() => {
            manager.generateObstacle();
        }, 3000);
    };

    const startGame = () => {
        // Clear all previous elements.
        factory.reset();
        resetBird();

        // Start generating obstacles.
        generateObstacles();

        // Make bird start moving.
        startBirdMotion();
        game.addGameOverEl(endGame);
        game.addObstacleAtMidEL(obstacleAtMid);
        gameOn = true;
    };

    const stopGame = () => {
        stopBirdMotion();
        game.removeGameOverEl(endGame);
        game.removeObstacleAtMidEL(obstacleAtMid);
        manager.stopAll();

        gameOn = false;
        gameOnPause = true;

        clearInterval(obstacleGeneratorTimerID);
    };

    const endGame = () => {
        stopGame();
        gameOnPause = false;
    };

    const gameOver = (obstacle: Obstacle): boolean => {
        if(obstacle == null) return true;
        return obstacle.MidInterface && (bird.Altitude  < obstacle.Height); // 150 = ground height, which bird < obstacle
    };

    startGame();
});