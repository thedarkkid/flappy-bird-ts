import "./style.scss";
import Bird from "./core/Bird";
import ObstacleFactory from "./core/ObstacleFactory";

document.addEventListener('DOMContentLoaded', () => {
    const bird: Bird = new Bird(document.querySelector('.bird'));
    const factory =  ObstacleFactory;
    const ground: HTMLDivElement = document.querySelector(".ground");

    let gravity:number = 2;

    const game = () => {
        bird.fall(gravity);
        bird.addFlyEL();
    };

    const startGame = () => {
        let gameTimerId = setInterval(game, 20);
        factory.generate();

    };

    startGame();
});