import { Scene, Tilemaps } from "phaser";
import { Actor } from "./actor";
import { Player } from "./player";

export class Level1Boss extends Actor {
  private target: Player;
  private AGRESSOR_RADIUS = 500;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    target: Player,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
    this.target = target;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.getBody().setSize(24, 28);
    this.getBody().setOffset(4, 5);
    this.initAnimations();
  }

  update(): void {
    !this.anims.isPlaying && this.anims.play("Boss1idle", true);
    this.checkBossFlip();
  }

  private checkBossFlip(): void {
    if (this.target.x < this.body.x) {
      this.scaleX = -1;
      this.getBody().setOffset(28, 5);
    } else {
      this.scaleX = 1;
      this.getBody().setOffset(4, 5);
    }
  }

  private initAnimations(): void {
    this.scene.anims.create({
      key: "Boss1idle",
      frames: this.scene.anims.generateFrameNames("orcboss_atlas", {
        prefix: "idle-",
        end: 3,
      }),
      frameRate: 8,
    });
  }
}
