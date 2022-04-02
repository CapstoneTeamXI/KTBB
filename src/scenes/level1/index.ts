import { Scene, Tilemaps } from 'phaser';
import { Player } from '../../classes/player';
import { Enemy } from '../../classes/enemy';
import { Chest } from '../../classes/chest';
import { Map } from '../../classes/map';
import { chestID, enemyID } from '../../consts';
import { Actor } from '../../classes/actor';

export class Level1 extends Scene {
  constructor() {
    super('level-1-scene');
  }

  private player!: Player;
  private map!: Tilemaps.Tilemap;
  private tileset!: Tilemaps.Tileset;
  private wallsLayer!: Tilemaps.DynamicTilemapLayer;
  private groundLayer!: Tilemaps.DynamicTilemapLayer;
  private onMap = true;
  private bossKeyValue: integer;
  private closedDoorActor!: Actor;
  private openDoorActor!: Actor;
  private spawnTimer!: NodeJS.Timer;

  private initCamera(): void {
    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    this.cameras.main.setZoom(2);
  }

  create(): void {
    this.onMap = true;
    localStorage.setItem('currentScene', JSON.stringify(this.scene.key));
    const updatedMap = Map.initMap(
      this,
      this.map,
      this.tileset,
      this.groundLayer,
      this.wallsLayer,
      this.physics,
      'dungeon'
    );

    this.map = updatedMap.map;
    this.wallsLayer = updatedMap.wallsLayer;
    this.player = new Player(this, 800, 1550);
    this.initCamera();
    this.closedDoorActor = new Actor(this, 800, 384, 'closedDoor');
    this.closedDoorActor.setImmovable();

    this.physics.add.collider(this.player, this.closedDoorActor);
    this.physics.add.collider(this.closedDoorActor, this.wallsLayer);

    Chest.initChests(
      this,
      this.map,
      this.physics,
      this.player,
      chestID.normalChest,
      'ChestPoint'
    );

    Enemy.initEnemy(
      this,
      this.map,
      this.physics,
      this.player,
      this.wallsLayer,
      enemyID.level1Orc,
      'Enemies',
      'EnemyPoint'
    );

    this.spawnTimer = setInterval(() => {
      if (this.onMap === true) {
        if (this.player.level === 2) {
          Enemy.initEnemy(
            this,
            this.map,
            this.physics,
            this.player,
            this.wallsLayer,
            enemyID.level2Orc,
            'Respawn',
            'RespawnPoint'
          );
        }
        if (this.player.level === 3) {
          Enemy.initEnemy(
            this,
            this.map,
            this.physics,
            this.player,
            this.wallsLayer,
            enemyID.level3Orc,
            'Respawn',
            'RespawnPoint'
          );
        }
        if (this.player.level >= 4) {
          Enemy.initEnemy(
            this,
            this.map,
            this.physics,
            this.player,
            this.wallsLayer,
            enemyID.level4Orc,
            'Respawn',
            'RespawnPoint'
          );
        }
      }
    }, 60000);
    this.physics.add.collider(this.player, this.wallsLayer);

    this.sound.play('monsterVania', {
      mute: false,
      volume: 0.1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    });

    const doorInterval = setInterval(() => {
      if (this.bossKeyValue === 4) {
        this.closedDoorActor.destroy();
        this.openDoorActor = new Actor(this, 800, 384, 'openDoor');
        this.physics.add.overlap(this.player, this.openDoorActor, () => {
          this.scene.start('level-1-boss-scene');
          localStorage.setItem(
            'playerLevel',
            JSON.stringify(this.player.level)
          );
          localStorage.setItem(
            'playerMaxHP',
            JSON.stringify(this.player.maxHP)
          );
          localStorage.setItem('playerHP', JSON.stringify(this.player.hp));
          localStorage.setItem(
            'playerAttack',
            JSON.stringify(this.player.attack)
          );
          localStorage.setItem('prevScene', JSON.stringify(this.scene.key));
          this.scene.get(this.scene.key).scene.stop();
          if (this.spawnTimer) {
            clearInterval(this.spawnTimer);
          }
          if (doorInterval) {
            clearInterval(doorInterval);
          }
        });
      }
    }, 1000);
  }

  update(): void {
    this.player.update();
    if (this.player.hp <= 0) {
      if (this.spawnTimer) {
        clearInterval(this.spawnTimer);
      }
    }
    this.bossKeyValue = parseInt(localStorage.getItem('bossKeyValue')!);
  }
}
