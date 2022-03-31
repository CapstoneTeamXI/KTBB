import Phaser from "phaser";

import { PressStart2P } from "../consts/Fonts";

export class TitleScreen extends Phaser.Scene {
  constructor() {
    super("title-screen");
  }
  preload() {}

  create() {
    const title = this.add.text(960, 350, "Orc's Layer", {
      fontSize: 50,
      fontFamily: PressStart2P,
    });
    title.setOrigin(0.5, 0.5);

    const description = this.add.text(
      960,
      450,
      "Collect keys from chests to unlock the boss chamber!",
      {
        fontSize: 35,
        fontFamily: PressStart2P,
      }
    );
    description.setOrigin(0.5, 0.5);

    const description2 = this.add.text(
      960,
      500,
      "Be careful for holes in the ground!",
      {
        fontSize: 35,
        fontFamily: PressStart2P,
      }
    );
    description2.setOrigin(0.5, 0.5);

    const description3 = this.add.text(
      960,
      550,
      "The Orc Lord's minions come out from them!",
      {
        fontSize: 35,
        fontFamily: PressStart2P,
      }
    );
    description3.setOrigin(0.5, 0.5);

    this.add
      .text(960, 650, "Press Space to Start", {
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
