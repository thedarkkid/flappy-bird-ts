import Bird from "../components/Bird";
import Obstacle from "../components/obstacle/Obstacle";
import ObstacleManager from "../components/obstacle/ObstacleManager";

let birdMotionTimerID: any;
let bird: Bird = new Bird(document.querySelector('.bird'));
const manager = ObstacleManager;
let obstacleGeneratorTimerID: any;

export const birdControl =  {
     startMotion: (gravity: number) => {
        birdMotionTimerID = setInterval(() => {
            bird.fall(gravity);
        }, 20);
        bird.addFlyEL();
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
        const birdHitBottom: boolean = bird.Altitude  < obstacle.Height;
        const birdHitTop: boolean = bird.Altitude + 45 > obstacle.Height - 300; // 45 is bird height
        let ruleToUse: boolean = (obstacle.IsTop) ? birdHitTop : birdHitBottom; // can shorted these three lines into one but leaving it for readability purposes
        return obstacle.MidInterface && (ruleToUse); //
    }
};

export const obstaclesControl = {
    generateObstacles: (speed: number) => {
        speed = 2500/speed + ((3000/speed)/2); // calculation for how fast/slow obstacles are generated.
        manager.generateObstacle();
        manager.generateObstacle(true);
        obstacleGeneratorTimerID = setInterval(() => {
            manager.generateObstacle();
            manager.generateObstacle(true);
        }, speed);
    },

    obstacleAtMid: (e: CustomEvent<Obstacle>, endGame: Function) => {
        if(gameControl.gameOver(e.detail)) endGame();
    },

     stopGenerateObstacles: () => {
        clearInterval(obstacleGeneratorTimerID);
    }
};