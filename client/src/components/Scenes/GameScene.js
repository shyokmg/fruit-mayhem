import Phaser from "phaser";
import { background, ground } from "../../assets/base64-images.js";

import {
  levelSpeed,
  fruitSprite,
  playerSprite,
  hazardSprite,
} from "../../utils/gameObjects";

const speedDown = 200;

// Initialize fruit properties
let fruitState = {
  name: fruitSprite[0].name,
  image: fruitSprite[0].image,
  points: fruitSprite[0].points,
  scale: fruitSprite[0].scale,
};

// Initialize hazard properties
let hazardState = {
  name: hazardSprite[0].name,
  image: hazardSprite[0].image,
  frameWidth: hazardSprite[0].frameWidth,
  frameHeight: hazardSprite[0].frameHeight,
  delay: hazardSprite[0].delay,
  scale: hazardSprite[0].scale,
};

// Initialize player hit detection
let isPlayerHit = false;

// Main scene class
export default class GameScene extends Phaser.Scene {
  constructor(level) {
    super({ key: "GameScene" });
    this.level = level;
    this.player;
    this.playerSpeed = speedDown + 300;
    this.fruitSpeed = speedDown * levelSpeed[level - 1];
    this.hazardSpeed = speedDown * levelSpeed[level - 1];
    this.cursor;
    this.fruitTarget;
    this.hazardTarget;
    this.points = 0;
    this.timedEvent;
    this.loadTimedEvent;
    this.hitTimedEvent;
    this.remainingTime;
  }

  // Initalizes game 
  preload() {
    // Store gameover boolean to events
    this.game.events.emit("gameOver", false);

    // Initialize assets
    this.textures.addBase64("background", background);
    this.textures.addBase64("ground", ground);

    playerSprite.map((sprite) => {
      this.createSprite(sprite);
    });
    fruitSprite.map((sprite) => {
      this.createSprite(sprite);
    });
    hazardSprite.map((sprite) => {
      this.createSprite(sprite);
    });
  }

  create() {
    // function for key inputs
    this.cursor = this.input.keyboard.createCursorKeys();

    // Store the points into events
    this.game.events.emit("storedScore", this.points);
    // Timer for loading assets 
    this.time.addEvent({
      delay: 1000,
      callback: this.loadAsset.bind(this),
      loop: false,
    });

    // Get current level from events
    this.game.events.on("currentLevel", (data) => {
      this.level = data;
    });

    // Initialize the hit time event for player hit by hazards and add a delay for animation
    this.hitTimedEvent = new Phaser.Time.TimerEvent({ delay: hazardState.delay })
  }

  // method to create animation frames
  createAnimSprite(sprite) {
    this.anims.create({
      key: sprite.key,
      frames: this.anims.generateFrameNumbers(sprite.name, {
        start: 0,
        end: sprite.endFrame,
      }),
      frameRate: sprite.frameRate,
      repeat: sprite.repeat,
    });
  }

  // method to load assets to the game
  loadAsset() {
    this.add.image(0, 0, "background").setOrigin(0, 0);
    const ground = this.physics.add.staticGroup();
    ground.create(0, 496, "ground").setOrigin(0, 0).refreshBody();
    this.player = this.physics.add.sprite(500, 400, "playerIdle");
    this.fruitTarget = this.physics.add
      .sprite(this.getRandomX(), 0, this.getRandomObject(fruitSprite).name)
      .setOrigin(0, 0)
      .setScale(fruitState.scale);

    this.hazardTarget = this.physics.add.sprite(
      this.getRandomX(),
      0,
      hazardState.name
    );

    playerSprite.map((sprite) => {
      this.createAnimSprite(sprite);
    });
    fruitSprite.map((sprite) => {
      this.createAnimSprite(sprite);
    });
    hazardSprite.map((hazard) => {
      this.anims.create({
        key: hazard.name,
        frames: [
          {
            key: hazard.name,
            frame: 0,
          },
        ],
        frameRate: 20,
      });
    });

    // initialize game objects properties
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.body.setGravityY(speedDown);
    this.physics.add.collider(this.player, ground);

    this.fruitTarget.setMaxVelocity(0, this.fruitSpeed);
    this.hazardTarget.setMaxVelocity(0, this.hazardSpeed);
    this.physics.add.overlap(
      this.fruitTarget,
      this.player,
      this.fruitTargetHit,
      null,
      this
    );
    this.physics.add.overlap(
      this.hazardTarget,
      this.player,
      this.hazardTargetHit,
      null,
      this
    );

    // timer event for the game timer, game over called when 30 secs is over
    this.timedEvent = this.time.delayedCall(30000, this.gameOver, [], this);
    
  }

  // update method for animations
  update() {

    // check if assets are loaded
    if (this.player) {

      // get incapacitated timer when player gets hit by hazard
      const hitProgress = this.hitTimedEvent.getRemainingSeconds();
      // get remaining time from timer 
      this.remainingTime = this.timedEvent.getRemainingSeconds();

      // store remaining time in time event
      this.game.events.emit(
        "storeRemainingTime",
        Math.round(this.remainingTime).toString()
      );

  
      // checks if incapacitated timer reaches 0, reset playerhit
    if (hitProgress === 0) {
      isPlayerHit = false;
    }

    // play animations for fruits
      this.fruitTarget.anims.play(fruitState.name, true);

      // reset fruits y location to 0 and x location randomly after reaching end of the canvas
      if (this.fruitTarget.y >= 576) {
        fruitState = this.getRandomObject(fruitSprite);
        this.fruitTarget.setY(0);
        this.fruitTarget.setX(this.getRandomX()).setScale(fruitState.scale);
      }

      // reset hazards y location to 0 and x location randomly after reaching end of the canvas
      if (this.hazardTarget.y >= 576) {
        hazardState = this.getRandomObject(hazardSprite);
        this.hazardTarget.setY(0);
        this.hazardTarget.setX(this.getRandomX()).setScale(hazardState.scale);
        // set time delay when hazard is spawned
        this.hitTimedEvent = new Phaser.Time.TimerEvent({
          delay: hazardState.delay,
        });
      }

      // player movement
      const { left, right } = this.cursor;
      // if player is hit play hit animation and cant move
      if (isPlayerHit) {
        this.player.setVelocityX(0);
        this.player.anims.play("hit", true);
        // else execute normal animation based on key input
      } else {
        if (left.isDown) {
          this.player.setVelocityX(-this.playerSpeed);
          this.player.anims.play("left", true);
        } else if (right.isDown) {
          this.player.setVelocityX(this.playerSpeed);
          this.player.anims.play("right", true);
        } else {
          this.player.setVelocityX(0);
          this.player.anims.play("idle", true);
        } 
      }
    }
  }

  // method on imbedding sprite images to page
  createSprite(spriteObj) {
    const image = new Image();
    image.onload = () => {
      this.textures.addSpriteSheet(spriteObj.name, image, {
        frameWidth: spriteObj.frameWidth,
        frameHeight: spriteObj.frameHeight,
      });
    };
    image.src = spriteObj.image;
  }

  // generate random number based on width of canvas
  getRandomX() {
    return Math.floor(Math.random() * 1000);
  }

  // generate random object based on input array
  getRandomObject(type) {
    const randomIndex = Math.floor(Math.random() * type.length);
    const randomObject = type[randomIndex];
    return randomObject;
  }

  // method when fruit hits player
  fruitTargetHit() {
    this.points += fruitState.points;
    // store points to event
    this.game.events.emit("storedScore", this.points);
    // generate random fruit after points stored
    fruitState = this.getRandomObject(fruitSprite);

    // reset fruits xy location
    this.fruitTarget.setY(0);
    this.fruitTarget.setX(this.getRandomX()).setScale(fruitState.scale);
  }

  // method when hazard hits player
  hazardTargetHit() {
    isPlayerHit = true;
    // add time event when incapacitated
    this.time.addEvent(this.hitTimedEvent);
    // get random hazard 
    hazardState = this.getRandomObject(hazardSprite);
    // reset hazards xy location
    this.hazardTarget.setY(0);
    this.hazardTarget.setX(this.getRandomX()).setScale(hazardState.scale);
  }

  // method for gameover state
  gameOver() {
    console.log("Game Over");
    // set event gameover to true
    this.game.events.emit("gameOver", true);
  }
}
