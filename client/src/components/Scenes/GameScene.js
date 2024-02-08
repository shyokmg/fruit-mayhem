import Phaser from "phaser";
// import background from "../../assets/background.png";
// import ground from "../../assets/ground.png";
import { background, ground } from "../../assets/base64-images.js"

import {
  levelSpeed,
  fruitSprite,
  playerSprite,
  hazardSprite,
} from "../../utils/gameObjects";

const speedDown = 200;
let fruitState = {
  name: fruitSprite[0].name,
  image: fruitSprite[0].image,
  points: fruitSprite[0].points,
  scale: fruitSprite[0].scale,
};

let hazardState = {
  name: hazardSprite[0].name,
  image: hazardSprite[0].image,
  frameWidth: hazardSprite[0].frameWidth,
  frameHeight: hazardSprite[0].frameHeight,
  delay: hazardSprite[0].delay,
  scale: hazardSprite[0].scale,
};

let isPlayerHit = false;
const nAssets = 14;
let nLoaded = 0;

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

  preload() {
    this.game.events.emit("gameOver", false);
    this.textures.addBase64("background", background);
    this.textures.addBase64('ground', ground)

    playerSprite.map((sprite) => { this.createSprite(sprite)});
    fruitSprite.map((sprite) => { this.createSprite(sprite)});
    hazardSprite.map((sprite) => { this.createSprite(sprite)});


    window.scene = this;
  }



  create() {
    this.cursor = this.input.keyboard.createCursorKeys();
    this.game.events.emit('storedScore', this.points);
    this.time.addEvent({ delay: 1000, callback: this.loadAsset.bind(this), loop: false});
    this.game.events.on('currentLevel', (data) => {
      this.level = data
    });
    
  }

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



  loadAsset() {
  this.add.image(0, 0, "background").setOrigin(0, 0);
  const ground = this.physics.add.staticGroup();
  ground.create(0, 496, "ground").setOrigin(0, 0).refreshBody();
  this.player = this.physics.add.sprite(500, 400, "playerIdle");
  this.fruitTarget = this.physics.add
      .sprite(this.getRandomX(), 0, this.getRandomObject(fruitSprite).name)
      .setOrigin(0, 0).setScale(fruitState.scale);

  

  playerSprite.map((sprite) => { this.createAnimSprite(sprite)})
  fruitSprite.map((sprite) => { this.createAnimSprite(sprite)})
  hazardSprite.map((hazard) => {
    this.anims.create({
      key: hazard.name,
      frames: [{
        key: hazard.name,
        frame: 0,
      }],
      frameRate: 20,
    })
  })


  this.player.setBounce(0.2);
  this.player.setCollideWorldBounds(true);
  this.player.body.setGravityY(speedDown);
  this.physics.add.collider(this.player, ground);

  this.fruitTarget.setMaxVelocity(0, this.fruitSpeed);
  // this.hazardTarget.setMaxVelocity(0, this.hazardSpeed);
  // this.physics.add.overlap(this.fruitTarget, this.player, this.fruitTargetHit, null, this)
  // this.physics.add.overlap(this.hazardTarget, this.player, this.hazardTargetHit, null, this)

  // this.game.events.emit('storeRemainingTime', Math.round(this.remainingTime).toString());
  this.timedEvent  = this.time.delayedCall(30000, this.gameOver, [], this)
  }

  update() {
    if (this.player) {
      this.remainingTime = this.timedEvent.getRemainingSeconds();
      this.game.events.emit('storeRemainingTime', Math.round(this.remainingTime).toString());

      this.fruitTarget.anims.play(fruitState.name, true)

      if (this.fruitTarget.y >= 576) {
        fruitState = this.getRandomObject(fruitSprite);
        this.fruitTarget.setY(0);
        this.fruitTarget.setX(this.getRandomX()).setScale(fruitState.scale)
      }

      const { left, right } = this.cursor;
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




  createSprite(spriteObj) {
    const image = new Image()
    image.onload = () => {
      this.textures.addSpriteSheet(spriteObj.name, image, {
        frameWidth: spriteObj.frameWidth,
        frameHeight: spriteObj.frameHeight
      })
    }
    image.src = spriteObj.image
  }

  getRandomX() {
    return Math.floor(Math.random() * 1000)
  }

  getRandomObject(type) {
    const randomIndex = Math.floor(Math.random() * type.length)
    const randomObject = type[randomIndex];
    return randomObject
  }

  gameOver() {
    console.log('Game Over');
    this.game.events.emit('gameOver', true);
  }
}
