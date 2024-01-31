import React, { useState } from "react";
import Game from "../components/Game";
import Phaser from "phaser";
import background from "../assets/background.png";
import ground from "../assets/ground.png";
import playerIdle from "../assets/playerIdleRight.png";
import playerRunRight from "../assets/playerRunRight.png";
import playerRunLeft from "../assets/playerRunLeft.png";

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
    this.player;
    this.cursor;
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
  }

  create() {
    this.add.image(0, 0, "background").setOrigin(0, 0);
    const ground = this.physics.add.staticGroup();
    ground.create(0, 496, "ground").setOrigin(0, 0).refreshBody();
    this.player = this.physics.add.sprite(100, 250, "playerIdle");

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

    this.player.body.setGravityY(300);
    this.physics.add.collider(this.player, ground);
    this.cursor = this.input.keyboard.createCursorKeys();
  }

  update() {
    const { left, right } = this.cursor;
    if (left.isDown) {
      this.player.setVelocityX(-500);
      this.player.anims.play("left", true);
    } else if (right.isDown) {
      this.player.setVelocityX(500);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("idle", true);
    }
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

  return (
    <div>
      <Game config={config} />
    </div>
  );
};

export default GamePage;