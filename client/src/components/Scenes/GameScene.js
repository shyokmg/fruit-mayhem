import Phaser from "phaser";
import background from "../../assets/background.png";
import ground from "../../assets/ground.png";
import { levelSpeed, fruitSprite, playerSprite, hazardSprite} from "../../utils/gameObjects"


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
  scale: hazardSprite[0].scale
};

let isPlayerHit = false;

export default class GameScene extends Phaser.Scene {
  
  constructor(level) {
    super({ key: "GameScene" });
    this.level = level;
    this.player;
    this.playerSpeed = speedDown + 300
    this.fruitSpeed = speedDown * levelSpeed[level-1]
    this.hazardSpeed = speedDown * levelSpeed[level-1]
    this.cursor;
    this.fruitTarget;
    this.hazardTarget;
    this.points = 0;
    this.timedEvent;
    this.hitTimedEvent;
    this.remainingTime;
    
  }

  preload() {
    
    this.load.image("background", background);
    this.load.image("ground", ground);
    console.log(this.level)
    playerSprite.map((sprite) => {
      this.load.spritesheet(sprite.name, sprite.image, {
        frameWidth: sprite.frameWidth,
        frameHeight: sprite.frameHeight,
      });
    })

    fruitSprite.map((fruit) => {
      this.load.spritesheet(fruit.name, fruit.image, {
        frameWidth: 32,
        frameHeight: 32
      });
    })

    hazardSprite.map((hazard) => {
      this.load.spritesheet(hazard.name, hazard.image, {
        frameWidth: hazard.frameWidth,
        frameHeight: hazard.frameHeight
      });
    })

    this.game.events.emit('gameOver', false);
  }

  create() {
    this.add.image(0, 0, "background").setOrigin(0, 0);
    const ground = this.physics.add.staticGroup();
    ground.create(0, 496, "ground").setOrigin(0, 0).refreshBody();
    this.player = this.physics.add.sprite(100, 250, "playerIdle");
    
    this.fruitTarget = this.physics.add
      .sprite(this.getRandomX(), 0, this.getRandomObject(fruitSprite).name)
      .setOrigin(0, 0);

      this.hazardTarget = this.physics.add
      .sprite(this.getRandomX(), 0, hazardState.name)

      this.game.events.on('currentLevel', (data) => {
        this.level = data
      });

    fruitSprite.map((fruit) => {
      this.anims.create({
        key: fruit.name,
        frames: this.anims.generateFrameNames(fruit.name, {
          start: 0,
          end: 16,
        }),
        frameRate: 32,
        repeat: -1,
      })
    })

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

    playerSprite.map((sprite) => {
      this.anims.create({
        key: sprite.key,
        frames: this.anims.generateFrameNumbers(sprite.name, {
          start: 0,
          end: sprite.endFrame,
        }),
        frameRate: sprite.frameRate,
        repeat: sprite.repeat,
      });
    })

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.player.body.setGravityY(speedDown);
    this.fruitTarget.setMaxVelocity(0, this.fruitSpeed);
    this.hazardTarget.setMaxVelocity(0, this.hazardSpeed);
    this.physics.add.collider(this.player, ground);
    this.physics.add.overlap(this.fruitTarget, this.player, this.fruitTargetHit, null, this)
    this.physics.add.overlap(this.hazardTarget, this.player, this.hazardTargetHit, null, this)
    this.cursor = this.input.keyboard.createCursorKeys();

    this.game.events.emit('storedScore', this.points);
    this.game.events.emit('storeRemainingTime', Math.round(this.remainingTime).toString());
    this.game.events.emit('storedFruitState', fruitState.name);

    this.timedEvent  = this.time.delayedCall(30000, this.gameOver, [], this)
    this.hitTimedEvent = new Phaser.Time.TimerEvent({ delay: hazardState.delay })

  }

  update() {
    const { left, right, up } = this.cursor;
    const hitProgress = this.hitTimedEvent.getRemainingSeconds();
  
    if (hitProgress === 0) {
      isPlayerHit = false;
    }
    
    this.remainingTime = this.timedEvent.getRemainingSeconds();
    this.game.events.emit('storeRemainingTime', Math.round(this.remainingTime).toString());
    

    this.fruitTarget.anims.play(fruitState.name, true)
    this.hazardTarget.anims.play(hazardState.name)
    
    if (this.fruitTarget.y >= 576) {
      fruitState = this.getRandomObject(fruitSprite);
      this.fruitTarget.setY(0);
      
      this.fruitTarget.setX(this.getRandomX()).setScale(fruitState.scale)
      
    }

    if (this.hazardTarget.y >= 576) {
      hazardState = this.getRandomObject(hazardSprite);
      this.hazardTarget.setY(0);
      this.hazardTarget.setX(this.getRandomX()).setScale(hazardState.scale)
      this.hitTimedEvent = new Phaser.Time.TimerEvent({ delay: hazardState.delay })
    }

      if (isPlayerHit) {
        this.player.setVelocityX(0);
        this.player.anims.play("hit", true);
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

  getRandomX() {
    return Math.floor(Math.random() * 1000)
  }

  fruitTargetHit() {
    this.points += fruitState.points ;
    this.game.events.emit('storedScore', this.points);
    fruitState = this.getRandomObject(fruitSprite)
    this.fruitTarget.setY(0);
    
    this.fruitTarget.setX(this.getRandomX()).setScale(fruitState.scale)
  }

  hazardTargetHit() {
    isPlayerHit = true;
    this.time.addEvent(this.hitTimedEvent);
    hazardState = this.getRandomObject(hazardSprite);
    this.hazardTarget.setY(0);
    this.hazardTarget.setX(this.getRandomX()).setScale(hazardState.scale)
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