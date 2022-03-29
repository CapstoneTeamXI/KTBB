import { Scene, Tilemaps } from "phaser";
import { Actor } from "./actor";
import { Player } from "./player";
import { EVENTS_NAME, GameStatus } from "../consts";
import { Text } from "./text";

export class Level1Boss extends Actor {
  private target: Player;
  private AGRESSOR_RADIUS = 500;
  private bossHP: number;
  private hpValue: Text;
  private alive = true;

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
    this.bossHP = 700;
    this.getBody().setSize(24, 28);
    this.getBody().setOffset(4, 5);
    this.initAnimations();
    this.attackHandler();

    this.hpValue = new Text(
      this.scene,
      this.x,
      this.y - this.height,
      this.bossHP.toString()
    )
      .setFontSize(12)
      .setOrigin(0.8, 0.5);

    this.scene.game.events.on(EVENTS_NAME.attack, this.attackHandler, this);
    this.on("destroy", () => {
      this.scene.game.events.removeListener(
        EVENTS_NAME.attack,
        this.attackHandler
      );
    });
  }

  update(): void {
    if (this.alive === true) {
      !this.anims.isPlaying && this.anims.play("Boss1idle", true);
      this.checkBossFlip();
    }
  }

  private attackHandler = () => {
    if (
      Phaser.Math.Distance.BetweenPoints(
        { x: this.x, y: this.y },
        { x: this.target.x, y: this.target.y }
      ) <
      this.target.width - 10
    ) {
      this.getEnemyDamage(
        this.getDamageValue(this.target.attack / 2, this.target.attack)
      );
      this.hpValue.setText(this.bossHP.toString());
      if (this.bossHP <= 0) {
        this.alive = false;
        this.disableBody(true, false);
        this.scene.time.delayedCall(0, () => {
          this.scene.game.events.emit(EVENTS_NAME.gameEnd, GameStatus.WIN);
          this.destroy();
          this.hpValue.destroy();
        });
      }
    }
  };

  private getEnemyDamage(value?: number): void {
    if (this.enemyiFrames === false) {
      this.scene.tweens.add({
        targets: this,
        duration: 100,
        repeat: 3,
        yoyo: true,
        alpha: 0.5,
        onStart: () => {
          if (value) {
            this.bossHP = this.bossHP - value;
          }
        },
        onComplete: () => {
          this.setAlpha(1);
        },
      });
      this.enemyiFrames = true;
      setTimeout(() => {
        this.enemyiFrames = false;
      }, 370);
    }
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
