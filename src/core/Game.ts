import Bird from "./components/Bird";
import Obstacle from "./components/obstacle/Obstacle";
import ObstacleManager from "./components/obstacle/ObstacleManager";

let birdMotionTimerID: any;
let bird: Bird = new Bird(document.querySelector('.bird'));
const manager = ObstacleManager;
let obstacleGeneratorTimerID: any;

export const birdControl =  {
     startMotion: (gravity: number) => {
        birdMotionTimerID = setInterval(() => {
            bird.fall(gravity);
            bird.addFlyEL();
        }, 20);
    },

     stopMotion: () => {
        bird.removeFlyEL();
        clearInterval(birdMotionTimerID);
    },

     reset: () => {
        bird = new Bird(document.querySelector('.bird'));
    }

};

export const gameControl = {
     gameOver: (obstacle: Obstacle): boolean => {
        if(obstacle == null) return true;
        return obstacle.MidInterface && (bird.Altitude  < obstacle.Height); // 150 = ground height, which bird < obstacle
    }
};

export const obstaclesControl = {
    generateObstacles: (speed: number) => {
        manager.generateObstacle();
        obstacleGeneratorTimerID = setInterval(() => {
            manager.generateObstacle();
        }, speed*1000);
    },

    obstacleAtMid: (e: CustomEvent<Obstacle>, endGame: Function) => {
        if(gameControl.gameOver(e.detail)) endGame();
    },

     stopGenerateObstacles: () => {
        clearInterval(obstacleGeneratorTimerID);
    }
};