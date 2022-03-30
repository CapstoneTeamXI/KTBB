import Phaser from "phaser";
import { PressStart2P } from "../consts/Fonts";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super("menu-scene");
  }

  preload() {
    this.load.image("pointer", "sprites/pointer.png");

    this.load.atlas(
      "pointer_atlas",
      "spritesheets/pointer.png",
      "spritesheets/pointer_atlas.json"
    );
  }

  create() {
    const title = this.add.text(960, 200, "Kill The Big Bad", {
      fontSize: 50,
      fontFamily: PressStart2P,
    });
    title.setOrigin(0.5, 0.5);

    const playButton = this.add.text(960, 400, "<Play>", {
      fontSize: 38,
      fontFamily: PressStart2P,
    });
    playButton.setOrigin(0.5, 0.5);

    const controlsButton = this.add.text(960, 500, "<How to Play>", {
      fontSize: 38,
      fontFamily: PressStart2P,
    });
    controlsButton.setOrigin(0.5, 0.5);

    const leaderboardButton = this.add.text(960, 600, "<Leaderboard>", {
      fontSize: 38,
      fontFamily: PressStart2P,
    });
    leaderboardButton.setOrigin(0.5, 0.5);

    const hoverSprite = this.add.sprite(100, 100, "pointer");
    hoverSprite.setScale(2);
    hoverSprite.setVisible(false);

    this.anims.create({
      key: "pointer",
      repeat: -1,
      frames: this.anims.generateFrameNames("pointer_atlas", {
        prefix: "pointer-",
        end: 7,
      }),
      frameRate: 8,
    });

    playButton.setInteractive();
    playButton.on("pointerover", () => {
      hoverSprite.setVisible(true);
      hoverSprite.play("pointer");
      hoverSprite.x = playButton.x - playButton.width + 30;
      hoverSprite.y = playButton.y;
    });

    playButton.on("pointerdown", () => {
      this.scene.start("title-screen");
    });

    controlsButton.setInteractive();
    controlsButton.on("pointerover", () => {
      hoverSprite.setVisible(true);
      hoverSprite.play("pointer");
      hoverSprite.x = controlsButton.x - controlsButton.width + 150;
      hoverSprite.y = controlsButton.y;
    });

    controlsButton.on("pointerdown", () => {});

    leaderboardButton.setInteractive();
    leaderboardButton.on("pointerover", () => {
      hoverSprite.setVisible(true);
      hoverSprite.play("pointer");
      hoverSprite.x = leaderboardButton.x - leaderboardButton.width + 150;
      hoverSprite.y = leaderboardButton.y;
    });
  }
}
