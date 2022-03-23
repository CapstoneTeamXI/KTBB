import { Scene, Tilemaps } from 'phaser';
import { Actor } from './actor';
import { Player } from './player';
import { EVENTS_NAME } from '../consts';
import { gameObjectsToObjectPoints } from '../helpers/gameobject-to-object-point';
import { Text } from './text';

export class Enemy extends Actor {
  private target: Player;
  private AGRESSOR_RADIUS = 125;
  private hpValue: Text;
  private attackHandler: () => void;

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
    this.getBody().setSize(16, 16);
    this.getBody().setOffset(0, 0);
    this.attackHandler = () => {
      if (
        Phaser.Math.Distance.BetweenPoints(
          { x: this.x, y: this.y },
          { x: this.target.x, y: this.target.y }
        ) <
        this.target.width - 25
      ) {
        this.getEnemyDamage(
          this.getDamageValue(target.attack / 2, target.attack)
        );
        this.hpValue.setText(this.enemyHP.toString());
        if (this.enemyHP <= 0) {
          this.disableBody(true, false);
          this.scene.time.delayedCall(0, () => {
            this.scene.game.events.emit(EVENTS_NAME.enemyKilled);
            this.destroy();
            this.hpValue.destroy();
            target.currentXP += target.enemyXP;
            if (target.currentXP >= target.requiredXP) {
              target.currentXP = 0;
              target.level += 1;
              target.hp += 10;
              target.requiredXP *= 2;
              target.attack += 5;
            }
          });
        }
      }
    };

    this.scene.game.events.on(EVENTS_NAME.attack, this.attackHandler, this);
    this.on('destroy', () => {
      this.scene.game.events.removeListener(
        EVENTS_NAME.attack,
        this.attackHandler
      );
    });

    this.hpValue = new Text(
      this.scene,
      this.x,
      this.y - this.height,
      this.enemyHP.toString()
    )
      .setFontSize(12)
      .setOrigin(0.8, 0.5);
    this.getBody().setSize(16, 16);
    this.getBody().setOffset(0, 0);
  }

  preUpdate(): void {
    if (
      Phaser.Math.Distance.BetweenPoints(
        { x: this.x, y: this.y },
        { x: this.target.x, y: this.target.y }
      ) < this.AGRESSOR_RADIUS
    ) {
      this.getBody().setVelocityX(this.target.x - this.x);
      this.getBody().setVelocityY(this.target.y - this.y);
      this.hpValue.setPosition(this.x, this.y - this.height * 0.4);
      this.hpValue.setOrigin(0.8, 0.5);
    } else {
      this.getBody().setVelocity(0);
      this.hpValue.setPosition(this.x, this.y - this.height * 0.4);
      this.hpValue.setOrigin(0.8, 0.5);
    }
  }

  public setTarget(target: Player): void {
    this.target = target;
  }

  static initEnemy(
    scene: Phaser.Scene,
    map: Tilemaps.Tilemap,
    physics: Scene['physics'],
    player: Player,
    wallsLayer: Tilemaps.DynamicTilemapLayer,
    enemyType: number,
    key: string
  ) {
    const enemiesPoints = gameObjectsToObjectPoints(
      map.filterObjects('Enemies', (obj) => obj.name === key)
    );
    const enemies = enemiesPoints.map((enemyPoint) =>
      new Enemy(
        scene,
        enemyPoint.x,
        enemyPoint.y,
        'tiles_spr',
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
  }
}
