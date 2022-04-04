import { Scene } from 'phaser';

export class HealthBar {
  private bar;
  x!: number;
  y!: number;
  private value!: number;
  private p!: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.bar = new Phaser.GameObjects.Graphics(scene);

    this.x = x;
    this.y = y;
    this.value = 100;
    this.p = 76 / 100;

    this.draw();

    scene.add.existing(this.bar);
  }

  getHP(MaxHP: number, CurrentHP: number) {
    let quotient = 100 / MaxHP;
    this.value = CurrentHP * quotient;

    if (this.value < 0) {
      this.value = 0;
    }
    this.draw();
    return this.value === 0;
  }

  draw() {
    this.bar.clear();

    this.bar.fillStyle(0x000000);
    this.bar.fillRect(this.x, this.y, 80, 16);

    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(this.x + 2, this.y + 2, 76, 12);

    if (this.value < 30) {
      this.bar.fillStyle(0xff0000);
    } else {
      this.bar.fillStyle(0x00ff00);
    }

    const d = Math.floor(this.p * this.value);
    this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
  }
}
