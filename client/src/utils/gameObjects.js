// import cherries from "../assets/fruits/cherries.png";
// import apples from "../assets/fruits/apples.png";
// import bananas from "../assets/fruits/bananas.png";
// import pineapples from "../assets/fruits/pineapples.png";
// import melons from "../assets/fruits/melons.png";
// import spikedBall from "../assets/hazards/spikedBall.png"
// import playerIdle from "../assets/player/playerIdleRight.png";
// import playerRunRight from "../assets/player/playerRunRight.png";
// import playerRunLeft from "../assets/player/playerRunLeft.png";
// import playerHit from "../assets/player/playerHit.png";

const cherries = "/src/assets/fruits/cherries.png";
const apples = "/src/assets/fruits/apples.png";
const bananas = "/src/assets/fruits/bananas.png";
const pineapples = "/src/assets/fruits/pineapples.png";
const melons = "/src/assets/fruits/melons.png";
const spikedBall = "/src/assets/hazards/spikedBall.png"
const playerIdleRight = "/src/assets/player/playerIdleRight.png";
const playerRunRight = "/src/assets/player/playerRunRight.png";
const playerRunLeft = "/src/assets/player/playerRunLeft.png";
const playerHit = "/src/assets/player/playerHit.png";


export const levelSpeed = [1, 1.2, 1.4, 1.5, 2.0]

export const fruitSprite = [
  {
    name: "cherries",
    image: cherries,
    points: 2,
    scale: 1,
    
  },
  {
    name: "apples",
    image: apples,
    points: 5,
    scale: 2,
  },
  {
    name: "bananas",
    image: bananas,
    points: 10,
    scale: 2,
    
  },
  {
    name: "pineapples",
    image: pineapples,
    points: 15,
    scale: 3,
    
  },
  {
    name: "melons",
    image: melons,
    points: 20,
    scale: 3,
    
  },
];

export const hazardSprite = [
  {
    name: "spikedBall",
    image: spikedBall,
    frameWidth: 56,
    frameHeight: 56,
    scale: 1,
    delay: 500,
    
  },
  {
    name: "spikedBall2",
    image: spikedBall,
    frameWidth: 56,
    frameHeight: 56,
    scale: 2,
    delay: 1000,
    
  },
  {
    name: "spikedBall3",
    image: spikedBall,
    frameWidth: 56,
    frameHeight: 56,
    scale: 3,
    delay: 2000,
    
  },
];


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
]