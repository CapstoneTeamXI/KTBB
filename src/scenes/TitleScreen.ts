import Phaser from "phaser";

import { PressStart2P } from "../consts/Fonts";

export class TitleScreen extends Phaser.Scene {
  constructor() {
    super("title-screen");
  }
  preload() {}

  create() {
    const title = this.add.text(960, 450, "Kill The Big Bad", {
      fontSize: 38,
      fontFamily: PressStart2P,
    });
    title.setOrigin(0.5, 0.5);

    this.add
      .text(960, 500, "Press Space to Start", {
        fontFamily: PressStart2P,
      })
      .setOrigin(0.5);

    this.input.keyboard.once("keydown-SPACE", () => {
      this.sound.play("Pong", { volume: 0.4 });
      localStorage.clear();
      this.scene.start("loading-scene");
    });
  }
}
