import { Input } from "phaser";
import { Actor } from "./actor";
import { Text } from "./text";
import { EVENTS_NAME, GameStatus } from "../consts";

export class Player extends Actor {
  private keyW: Phaser.Input.Keyboard.Key;
  private keyA: Phaser.Input.Keyboard.Key;
  private keyS: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;
  private keyShift: Phaser.Input.Keyboard.Key;
  private keySpace: Input.Keyboard.Key;
  private hpValue: Text;
  private soundDelay = false;
  private dashCooldown = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "knight");
    this.keyW = this.scene.input.keyboard.addKey("W");
    this.keyA = this.scene.input.keyboard.addKey("A");
    this.keyS = this.scene.input.keyboard.addKey("S");
    this.keyD = this.scene.input.keyboard.addKey("D");
    this.keyShift = this.scene.input.keyboard.addKey("Shift");
    this.keySpace = this.scene.input.keyboard.addKey(32);
    this.keySpace.on("down", (event: KeyboardEvent) => {
      if (this.soundDelay === false) {
        this.soundDelay = true;
        this.anims.play("attack", true);
        this.scene.sound.play("hammerSwipe", { volume: 0.1 });
        setTimeout(() => {
          this.soundDelay = false;
        }, 370);
      }
      this.scene.game.events.emit(EVENTS_NAME.attack);
    });

    this.hpValue = new Text(
      this.scene,
      this.x,
      this.y - this.height,
      this.hp.toString()
    )
      .setFontSize(12)
      .setOrigin(0.8, 0.5);
    this.getBody().setSize(15, 20);
    this.getBody().setOffset(16, 15);
    this.on("destroy", () => {
      this.keySpace.removeAllListeners();
    });
    this.initAnimations();
  }

  update(): void {
    this.getBody().setVelocity(0);
    if (this.keyW?.isDown) {
      this.body.velocity.y = -110;
      !this.anims.isPlaying && this.anims.play("run", true);
    }
    if (this.keyA?.isDown) {
      this.body.velocity.x = -110;
      this.checkFlip();
      this.getBody().setOffset(31, 15);
      !this.anims.isPlaying && this.anims.play("run", true);
    }
    if (this.keyS?.isDown) {
      this.body.velocity.y = 110;
      !this.anims.isPlaying && this.anims.play("run", true);
    }
    if (this.keyD?.isDown) {
      this.body.velocity.x = 110;
      this.checkFlip();
      this.getBody().setOffset(16, 15);
      !this.anims.isPlaying && this.anims.play("run", true);
    }
    if (this.dashCooldown === false) {
      if (this.keyShift?.isDown && this.keyW?.isDown) {
        this.iFrames = true;
        this.body.velocity.y = -960;
        setTimeout(() => {
          this.dashCooldown = true;
        }, 70);
        setTimeout(() => {
          this.iFrames = false;
        }, 1000);
        setTimeout(() => {
          this.dashCooldown = false;
        }, 3000);
      }
      if (this.keyShift?.isDown && this.keyA?.isDown) {
        this.iFrames = true;
        this.body.velocity.x = -960;
        setTimeout(() => {
          this.dashCooldown = true;
        }, 70);
        setTimeout(() => {
          this.iFrames = false;
        }, 1000);
        setTimeout(() => {
          this.dashCooldown = false;
        }, 3000);
      }
      if (this.keyShift?.isDown && this.keyS?.isDown) {
        this.iFrames = true;
        this.body.velocity.y = 960;
        setTimeout(() => {
          this.dashCooldown = true;
        }, 70);
        setTimeout(() => {
          this.iFrames = false;
        }, 1000);
        setTimeout(() => {
          this.dashCooldown = false;
        }, 3000);
      }
      if (this.keyShift?.isDown && this.keyD?.isDown) {
        this.iFrames = true;
        this.body.velocity.x = 960;
        setTimeout(() => {
          this.dashCooldown = true;
        }, 70);
        setTimeout(() => {
          this.iFrames = false;
        }, 1000);
        setTimeout(() => {
          this.dashCooldown = false;
        }, 3000);
      }
    }
    !this.anims.isPlaying && this.anims.play("idle", true);
    this.hpValue.setPosition(this.x, this.y - this.height * 0.4);
    this.hpValue.setOrigin(0.8, 0.5);
    this.hpValue.setText(this.hp.toString());
    if (this.currentXP >= this.requiredXP) {
      this.levelUp();
    }
  }

  private levelUp(): void {
    this.currentXP = 0;
    this.level += 1;
    this.hp += 10;
    this.requiredXP *= 2;
    this.attack += 5;
  }

  public getDamage(value?: number): void {
    super.getDamage(value);
    this.hpValue.setText(this.hp.toString());
    if (this.hp <= 0) {
      this.scene.game.events.emit(EVENTS_NAME.gameEnd, GameStatus.LOSE);
    }
  }

  private initAnimations(): void {
    this.scene.anims.create({
      key: "run",
      frames: this.scene.anims.generateFrameNames("knight_atlas", {
        prefix: "run-",
        end: 3,
      }),
      frameRate: 8,
    });
    this.scene.anims.create({
      key: "attack",
      frames: this.scene.anims.generateFrameNames("knight_atlas", {
        prefix: "attack-",
        end: 2,
      }),
      frameRate: 8,
    });
    this.scene.anims.create({
      key: "idle",
      frames: this.scene.anims.generateFrameNames("knight_atlas", {
        prefix: "idle-",
        end: 3,
      }),
      frameRate: 8,
    });
  }
}
