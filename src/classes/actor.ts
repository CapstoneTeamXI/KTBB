import { Physics } from 'phaser';

export class Actor extends Physics.Arcade.Sprite {
  maxHP = 10;
  hp = 10;
  level = 1;
  requiredXP = 5;
  currentXP = 0;
  attack = 1;
  protected iFrames = false;
  protected dashiFrames = false;
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
    if (this.iFrames === false && this.dashiFrames === false) {
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

  protected checkEnemyFlip(): void {
    if (this.body.velocity.x < 0) {
      this.scaleX = -1.5;
      this.getBody().setOffset(15, 0);
    } else {
      this.scaleX = 1.5;
      this.getBody().setOffset(3, 0);
    }
  }

  protected getBody(): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body;
  }

  public getDamageValue(min: number, max: number): number {
    let critChance = Math.floor(Math.random() * 100);
    let damage = Math.floor(Math.random() * (max - min + 1) + min);
    if (damage === 0) {
      damage = 1;
    }
    if (critChance >= 90) {
      damage = damage * 2;
    }
    return damage;
  }
}
