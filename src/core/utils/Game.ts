import Bird from "../components/Bird";
import Obstacle from "../components/obstacle/Obstacle";
import ObstacleManager from "../components/obstacle/ObstacleManager";
import {clearScreen, endScreen, pauseScreen, startScreen} from "./Screen";
import eventor from "./Eventor";

let birdMotionTimerID: any;
let bird: Bird = new Bird(document.querySelector('.bird'));
const manager = ObstacleManager;
let obstacleGeneratorTimerID: any;
let canGenerateObstacles = true;
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
     isOver: (obstacle: Obstacle): boolean => {
        if(obstacle == null) return true;
        const birdHitBottom: boolean = bird.Altitude  < obstacle.Height;
        const birdHitTop: boolean = bird.Altitude + 45 > obstacle.Height - 300; // 45 is bird height
        let ruleToUse: boolean = (obstacle.IsTop) ? birdHitTop : birdHitBottom; // can shorted these three lines into one but leaving it for readability purposes
        return obstacle.MidInterface && (ruleToUse); //
    }
};

export const obstaclesControl = {
    generateObstacles: (speed: number) => {
        if(!canGenerateObstacles) return;
        speed = 2500/speed + ((3000/speed)/2); // calculation for how fast/slow obstacles are generated.
        manager.generateObstacle();
        manager.generateObstacle(true);
        obstacleGeneratorTimerID = setInterval(() => {
            manager.generateObstacle();
            manager.generateObstacle(true);
        }, speed);
        canGenerateObstacles = true;
    },

    obstacleAtMid: (e: CustomEvent<Obstacle>, endGame: Function) => {
        if(gameControl.isOver(e.detail)) endGame();
    },

    reset: () => {
        canGenerateObstacles = true;
    },

    stopGenerateObstacles: () => {
        canGenerateObstacles = false;
        clearInterval(obstacleGeneratorTimerID);
    }
};

export const screenControl = {

    showPauseXCR: (e: KeyboardEvent) => {
        if(e.key == "Enter") pauseScreen(true);
    },
    hidePauseXCR: (e: KeyboardEvent) => {
        pauseScreen(false);
    },
    waiting: () => {
        clearScreen();
        startScreen(true);
    },
    restart: () => {
        clearScreen();
        endScreen(true);
    },
    start: () => {
        clearScreen();
        eventor.removeKeyupEL("hidePauseXCR");
        eventor.addKeyupEL(screenControl.showPauseXCR, "showPauseXCR");
    },
    pause: () => {
        clearScreen();
        pauseScreen(true);
        eventor.removeKeyupEL("showPauseXCR");
        eventor.addKeyupEL(screenControl.hidePauseXCR, "hidePauseXCR");
    },
    resume: () => {
        pauseScreen(false);
    }

};