import Obstacle from "../components/Obstacle";

export const GameOverEvent: Event = new Event('gameOver');
export const BirdJumpedEvent = new Event("birdJumped");
export const getOAMEvent = (obstacle: Obstacle):CustomEvent<Obstacle> => {
    return new CustomEvent<Obstacle>("obstacleAtMid", {detail:obstacle})
};
