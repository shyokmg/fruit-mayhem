// import base64 images
import {
  playerHit,
  playerIdleRight,
  playerRunLeft,
  playerRunRight,
  cherries,
  apples,
  bananas,
  pineapples,
  melons,
  spikedBall
} from "../assets/base64-images.js";


// export speed of gravity by level
export const levelSpeed = [1, 1.2, 1.4, 1.5, 2.0];

// exports fruit sprite properties
export const fruitSprite = [
  {
    name: "cherries",
    key: "cherries",
    image: cherries,
    points: 2,
    scale: 1.5,
    frameWidth: 32,
    frameHeight: 32,
    endFrame: 16,
    frameRate: 32,
    repeat: -1,
  },
  {
    name: "apples",
    key: "apples",
    image: apples,
    points: 5,
    scale: 2,
    frameWidth: 32,
    frameHeight: 32,
    endFrame: 16,
    frameRate: 32,
    repeat: -1,
  },
  {
    name: "bananas",
    key: "bananas",
    image: bananas,
    points: 10,
    scale: 2,
    frameWidth: 32,
    frameHeight: 32,
    endFrame: 16,
    frameRate: 32,
    repeat: -1,
  },
  {
    name: "pineapples",
    key: "pineapples",
    image: pineapples,
    points: 15,
    scale: 3,
    frameWidth: 32,
    frameHeight: 32,
    endFrame: 16,
    frameRate: 32,
    repeat: -1,
  },
  {
    name: "melons",
    key: "melons",
    image: melons,
    points: 20,
    scale: 3,
    frameWidth: 32,
    frameHeight: 32,
    endFrame: 16,
    frameRate: 32,
    repeat: -1,
  },
];

// exports hazard sprite properties
export const hazardSprite = [
  {
    name: "spikedBall",
    key: "spikedBall",
    image: spikedBall,
    frameWidth: 56,
    frameHeight: 56,
    scale: 1,
    delay: 500,
  },
  {
    name: "spikedBall2",
    key: "spikedBall2",
    image: spikedBall,
    frameWidth: 56,
    frameHeight: 56,
    scale: 2,
    delay: 1000,
  },
  {
    name: "spikedBall3",
    key: "spikedBall3",
    image: spikedBall,
    frameWidth: 56,
    frameHeight: 56,
    scale: 3,
    delay: 2000,
  },
];

// exports player sprite properties
export const playerSprite = [
  {
    name: "playerIdle",
    key: "idle",
    image: playerIdleRight,
    frameWidth: 96,
    frameHeight: 96,
    endFrame: 21,
    frameRate: 46,
    repeat: -1,
  },
  {
    name: "playerRunRight",
    key: "right",
    image: playerRunRight,
    frameWidth: 96,
    frameHeight: 96,
    endFrame: 23,
    frameRate: 50,
    repeat: -1,
  },
  {
    name: "playerRunLeft",
    key: "left",
    image: playerRunLeft,
    frameWidth: 96,
    frameHeight: 96,
    endFrame: 23,
    frameRate: 50,
    repeat: -1,
  },
  {
    name: "playerHit",
    key: "hit",
    image: playerHit,
    frameWidth: 96,
    frameHeight: 96,
    endFrame: 6,
    frameRate: 7,
    repeat: 3,
  },
];
