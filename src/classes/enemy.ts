import { Scene, Tilemaps } from "phaser";
import { Actor } from "./actor";
import { Player } from "./player";
import { EVENTS_NAME } from "../consts";
import { gameObjectsToObjectPoints } from "../helpers/gameobject-to-object-point";

export class Enemy extends Actor {
  private target: Player;
  private AGRESSOR_RADIUS = 125;
  private enemyXP: number;
  private enemyHP: number;

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
    this.getBody().setSize(12, 16);
    this.getBody().setOffset(3, 0);
    this.enemyXP = this.target.level;
    this.enemyHP = this.target.requiredXP;
    this.attackHandler();

    this.scene.game.events.on(EVENTS_NAME.attack, this.attackHandler, this);
    this.on("destroy", () => {
      this.scene.game.events.removeListener(
        EVENTS_NAME.attack,
        this.attackHandler
      );
    });
  }

  private attackHandler = () => {
    if (
      Phaser.Math.Distance.BetweenPoints(
        { x: this.x, y: this.y },
        { x: this.target.x, y: this.target.y }
      ) <
      this.target.width - 5
    ) {
      this.getEnemyDamage(
        this.getDamageValue(this.target.attack / 2, this.target.attack)
      );
      if (this.enemyHP <= 0) {
        this.disableBody(true, false);
        this.scene.time.delayedCall(0, () => {
          this.scene.game.events.emit(EVENTS_NAME.enemyKilled);
          this.target.currentXP += this.enemyXP;
          this.destroy();
        });
      }
    }
  };

  preUpdate(): void {
    if (
      Phaser.Math.Distance.BetweenPoints(
        { x: this.x, y: this.y },
        { x: this.target.x, y: this.target.y }
      ) < this.AGRESSOR_RADIUS
    ) {
      this.getBody().setVelocityX(this.target.x - this.x);
      this.checkEnemyFlip();
      this.getBody().setVelocityY(this.target.y - this.y);
      if (this.enemyiFrames === true) {
        this.getBody().setVelocity(0);
      }
    } else {
      this.getBody().setVelocity(0);
    }
  }

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
      }, 370);
    }
  }

  static initEnemy(
    scene: Phaser.Scene,
    map: Tilemaps.Tilemap,
    physics: Scene["physics"],
    player: Player,
    wallsLayer: Tilemaps.DynamicTilemapLayer,
    enemyType: number,
    objType: string,
    key: string
  ) {
    const enemiesPoints = gameObjectsToObjectPoints(
      map.filterObjects(objType, (obj) => obj.name === key)
    );
    const enemies = enemiesPoints.map((enemyPoint) =>
      new Enemy(
        scene,
        enemyPoint.x,
        enemyPoint.y,
        "tiles_spr",
        player,
        enemyType
      )
        .setName(enemyPoint.id.toString())
        .setScale(1.5)
    );
    physics.add.collider(enemies, wallsLayer);
    physics.add.collider(enemies, enemies);
    physics.add.overlap(player, enemies, (obj1, _) => {
      (obj1 as Player).getDamage(player.level);
    });
    return enemies;
  }
}
