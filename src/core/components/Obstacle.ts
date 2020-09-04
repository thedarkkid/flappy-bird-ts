import Obstacle_ from "./obstacle/Obstacle";
export class Obstacle extends Obstacle_{}

import ObstacleFactory_ from "./obstacle/ObstacleFactory";
export const Factory = ObstacleFactory_;

import ObstacleManager_ from "./obstacle/ObstacleManager";
export const Manager = ObstacleManager_;

import ObstacleStorage_ from "./obstacle/ObstacleStorage";
export const Storage = ObstacleStorage_;

export default Obstacle;