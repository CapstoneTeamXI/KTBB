import { Text } from './text';

export class Timer extends Text {
  private timer: string;
  private hour: number;
  private minute: number;
  private second: number;
  // private secondStr: string = '';

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    initTimer = '00:00:00'
  ) {
    super(scene, x, y, `${initTimer}`);
    scene.add.existing(this);
    this.timer = initTimer;
    this.second = 0;
    this.minute = 0;
    this.hour = 0;
  }

  public gameTimer(): void {
    this.second++;

    if (this.second === 60) {
      this.second = 0;
      this.minute++;
    }
    if (this.minute === 60) {
      this.minute = 0;
      this.hour++;
    }

    let secondStr = this.second < 10 ? `0${this.second}` : `${this.second}`;
    let minuteStr: string =
      this.minute < 10 ? `0${this.minute}` : `${this.minute}`;
    let hourStr: string = this.hour < 10 ? `0${this.hour}` : `${this.hour}`;

    this.timer = `${hourStr}:${minuteStr}:${secondStr}`;

    this.setText(`${this.timer}`);
  }

  public getValue(): number {
    // if (this.hour > 0) {
    //   return `${this.hour} hr ${this.minute} min ${this.second} sec`;
    // }
    // if (this.minute > 0) {
    //   return `${this.minute} min ${this.second} sec`;
    // }
    // return `${this.second} sec`;
    return this.hour * 60 * 60 + this.minute * 60 + this.second;
  }
}
