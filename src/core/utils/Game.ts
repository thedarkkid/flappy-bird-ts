import Bird from "../components/Bird";
import Obstacle from "../components/obstacle/Obstacle";
import ObstacleManager from "../components/obstacle/ObstacleManager";
import {clearScreen, endScreen, pauseScreen, startScreen} from "./Screen";
import eventor from "./Eventor";
import GameElement from "../components/GameElement";
import GameStats from "../components/GameStats";

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
        obstaclesControl.reset();
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
};

export const statsControl = {
    gameStats: null as GameStats,
    scoreElement: null as GameElement,
    jumpElement: null as GameElement,
    statCtrlIntervalId: null as any,
    nodes:{
        scoreNode: null as HTMLElement,
        jumpNode: null as HTMLElement
    },

    init: (gravity: number, speed: number, scoreElement: GameElement, jumpElement: GameElement) =>{
        statsControl.gameStats = new GameStats(gravity, speed);
        statsControl.scoreElement =  scoreElement;
        statsControl.jumpElement = jumpElement;
        statsControl.createJumpNode();
        statsControl.createScoreNode();
        return statsControl;
    },

    start: () => {
        statsControl.gameStats.run(1000);
        let startHandler = () => {
            statsControl.updateJump(statsControl.nodes.jumpNode);
            statsControl.updateScore(statsControl.nodes.scoreNode);
        };
        statsControl.statCtrlIntervalId = setInterval(startHandler, 1000)
    },

    hold: () => {
        statsControl.gameStats.pause();
        clearInterval(statsControl.statCtrlIntervalId);
    },

    end: () => {
        statsControl.hold();
        statsControl.gameStats.end();
    },

    restart: () => {
        statsControl.end();
        statsControl.start();
    },

    reset: () => {
        statsControl.gameStats.end();
        clearInterval(statsControl.statCtrlIntervalId);
    },

    createScoreNode: () => {
        statsControl.nodes.scoreNode =  document.createElement("p");
        statsControl.scoreElement.changeContent(statsControl.nodes.scoreNode);
    },

    createJumpNode: () => {
        statsControl.nodes.jumpNode =  document.createElement("p");
        statsControl.jumpElement.changeContent(statsControl.nodes.jumpNode);
    },

    updateScore: (updateNode: HTMLElement) => {
        const score = statsControl.gameStats.Score;
        console.log(`changed score to ${score}`);
        updateNode.innerText = `${score}`;
    },

    updateJump: (updateNode: HTMLElement) => {
        const jumps = statsControl.gameStats.Jumps;
        console.log(`changed jumps ${jumps}`);
        updateNode.innerText = `${jumps}`;
    }
};