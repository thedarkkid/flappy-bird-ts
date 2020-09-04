import "./style.scss";
import Bird from "./core/Bird";
import ObstacleFactory from "./core/ObstacleFactory";
import ObstacleManager from "./core/ObstacleManager";
import Obstacle from "./core/Obstacle";

// Check to use events to manage game over.
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
        manager.generateObstacle();
        obstacleGeneratorTimerID = setInterval(() => {
            manager.generateObstacle();
            if(bird.Crashed || gameOver()) { endGame();}
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

    const gameOver = (): boolean => {
        const obstacle: Obstacle = factory.latest();
        if(obstacle == null) return true;
        console.log(`Altitude ${bird.Altitude}, Obstacle height ${obstacle.Height}, Mid interface: ${obstacle.MidInterface}`);
        return obstacle.MidInterface && (bird.Altitude  < obstacle.Height); // 150 = ground height, which bird < obstacle
    };

    startGame();
});