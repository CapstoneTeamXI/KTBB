import { Physics } from 'phaser';

export class Actor extends Physics.Arcade.Sprite {
  enemyHP = 5;
  hp = 10;
  level = 1;
  requiredXP = 5;
  currentXP = 0;
  attack = 1;
  protected iFrames = false;
  protected enemyiFrames = false;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.getBody().setCollideWorldBounds(true);
  }

  public getDamage(value?: number): void {
    if (this.iFrames === false) {
      this.scene.tweens.add({
        targets: this,
        duration: 100,
        repeat: 3,
        yoyo: true,
        alpha: 0.5,
        onStart: () => {
          if (value) {
            this.hp = this.hp - value;
          }
        },
        onComplete: () => {
          this.setAlpha(1);
        },
      });
      this.iFrames = true;
      setTimeout(() => {
        this.iFrames = false;
      }, 700);
    }
  }

  public getEnemyDamage(value?: number): void {
    if (this.enemyiFrames === false) {
      this.scene.tweens.add({
        targets: this,
        duration: 100,
        repeat: 3,
        yoyo: true,
        alpha: 0.5,
        onStart: () => {
          if (value) {
            this.enemyHP = this.enemyHP - value;
          }
        },
        onComplete: () => {
          this.setAlpha(1);
        },
      });
      this.enemyiFrames = true;
      setTimeout(() => {
        this.enemyiFrames = false;
      }, 350);
    }
  }

  public getHPValue(): number {
    return this.hp;
  }

  protected checkFlip(): void {
    if (this.body.velocity.x < 0) {
      this.scaleX = -1;
    } else {
      this.scaleX = 1;
    }
  }

  protected getBody(): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body;
  }

  public getDamageValue(min: number, max: number): number {
    let damage = Math.floor(Math.random() * (max - min + 1) + min);
    if (damage === 0) {
      damage = 1;
    }
    return damage;
  }
}
