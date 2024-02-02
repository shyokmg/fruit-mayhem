import React, { useState } from "react";
import { useParams } from 'react-router-dom';

import Game from "../components/Game";
import Phaser from "phaser";
import background from "../assets/background.png";
import ground from "../assets/ground.png";
import playerIdle from "../assets/playerIdleRight.png";
import playerRunRight from "../assets/playerRunRight.png";
import playerRunLeft from "../assets/playerRunLeft.png";
import cherries from "../assets/cherries.png"
// import fruitDespawn from "../assets/fruitDespawn.png"

// const [test, setGameOver] = useState(false);
const speedDown = 200;
let score = 0;
let test2 = false;

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
    this.player;
    this.playerSpeed = speedDown + 300
    this.cursor;
    this.target;
    this.points = 0;
    this.textScore;
    this.textTime;
    this.timedEvent;
    this.remainingTime;

  }

  preload() {
    this.load.image("background", background);
    this.load.image("ground", ground);
    this.load.spritesheet("playerIdle", playerIdle, {
      frameWidth: 96,
      frameHeight: 96,
    });
    this.load.spritesheet("playerRunRight", playerRunRight, {
      frameWidth: 96,
      frameHeight: 96,
    });
    this.load.spritesheet("playerRunLeft", playerRunLeft, {
      frameWidth: 96,
      frameHeight: 96,
    });
    this.load.spritesheet("cherries", cherries, {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  create() {
    this.add.image(0, 0, "background").setOrigin(0, 0);
    const ground = this.physics.add.staticGroup();
    ground.create(0, 496, "ground").setOrigin(0, 0).refreshBody();
    this.player = this.physics.add.sprite(100, 250, "playerIdle");

    this.target = this.physics.add
      .sprite(0, 0, "cherries")
      .setOrigin(0, 0);

    this.anims.create({
      key: "cherry",
      frames: this.anims.generateFrameNames("cherries", {
        start: 0,
        end: 33,
      }),
      frameRate: 64,
      repeat: -1,
    })

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("playerIdle", {
        start: 0,
        end: 21,
      }),
      frameRate: 46,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("playerRunRight", {
        start: 0,
        end: 23,
      }),
      frameRate: 50,
      repeat: -1,
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("playerRunLeft", {
        start: 0,
        end: 23,
      }),
      frameRate: 50,
      repeat: -1,
    });

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.player.body.setGravityY(speedDown);
    this.target.setMaxVelocity(0, speedDown);
    this.physics.add.collider(this.player, ground);
    this.physics.add.overlap(this.target, this.player, this.targetHit, null, this)
    this.cursor = this.input.keyboard.createCursorKeys();

    this.textScore = this.add.text(1024 - 120, 10, "Score:0", {
      font: "25px Arial",
      fill: "#000000"
    });

    this.textTime = this.add.text(10, 10, "Remaining Time: 00", {
      font: "25px Arial",
      fill: "#000000"
    });

    this.timedEvent  = this.time.delayedCall(10000, this.gameOver, [], this)
  }

  update() {
    const { left, right } = this.cursor;
    this.remainingTime = this.timedEvent.getRemainingSeconds();
    this.textTime.setText(`Remaining Time: ${Math.round(this.remainingTime).toString()}`)
    this.target.anims.play("cherry", true)

    if (this.target.y >= 576) {
      this.target.setY(0);
      this.target.setX(this.getRandomX())
    }

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

  getRandomX() {
    return Math.floor(Math.random() * 1024)
  }

  targetHit() {
    this.target.setY(0);
    this.target.setX(this.getRandomX());
    // this.target.anims.play("despawn", true)
    this.points++;
    score = this.points;
    // setScore(this.points);
    this.textScore.setText(`Score: ${this.points}`)
  }

  gameOver() {
    console.log('Game Over');
    test2 = true
    
  }

}

const GamePage = () => {
  const config = {
    type: Phaser.AUTO,
    parent: "phaser-container",
    width: 1024,
    height: 576,
    scene: [GameScene],
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 200 },
        debug: true,
      },
    },
  };
  
  const {level} = useParams();
  const [test, setGameOver] = useState(false);
  if (test2) {
    setGameOver(true);
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* <h1 style={{ position: 'absolute', top: '0px', left: '480px', zIndex: 1 }}>Level: {level} </h1> */}
      {/* <h1 style={{ position: 'absolute', top: '0px', left: '850px', zIndex: 1 }}>Score: {point} </h1> */}
      <Game config={config} level={level} score={score} gameOver={test} />
    </div>
  );
};

export default GamePage;