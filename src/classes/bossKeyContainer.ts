import { Text } from "./text";
// export enum BossKeyOperations{
//   ADD_KEY
// }

export class BossKeyContainer extends Text {
  private bossKeyValue: integer;

  constructor(scene: Phaser.Scene, x: number, y: number, bossKeyCount = 0) {
    super(scene, x, y, `Boss Keys: ${bossKeyCount}/4`);
    // scene.add.existing(this);
    this.bossKeyValue = bossKeyCount;
  }

  // after collecting keyChest:
  // render keyChest animation
  // call keyChest sound fx

  // add key sprite to Boss Key 'array'

  public addBossKey(): void {
    this.bossKeyValue++;
    localStorage.setItem("bossKeyValue", JSON.stringify(this.bossKeyValue));
    this.setText(`Boss Keys: ${this.bossKeyValue}/4`);
    if (this.bossKeyValue === 4) {
      this.setText(`BOSS DOOR OPEN, CHALLENGE HE IF YE DARE!`);
    }
  }
}
