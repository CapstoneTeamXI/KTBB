import { Scene, Tilemaps } from 'phaser';
import { Player } from '../../classes/player';
import { Enemy } from '../../classes/enemy';
import { Chest } from '../../classes/chest';
import { Map } from '../../classes/map';
import { chestID, enemyID } from '../../consts';

export class Level1 extends Scene {
  constructor() {
    super('level-1-scene');
  }

  private player!: Player;
  private map!: Tilemaps.Tilemap;
  private tileset!: Tilemaps.Tileset;
  private wallsLayer!: Tilemaps.DynamicTilemapLayer;
  private groundLayer!: Tilemaps.DynamicTilemapLayer;

  private initCamera(): void {
    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    this.cameras.main.setZoom(2);
  }

  create(): void {
    const updatedMap = Map.initMap(
      this,
      this.map,
      this.tileset,
      this.groundLayer,
      this.wallsLayer,
      this.physics
    );
    this.player = new Player(this, 100, 100);
    this.initCamera();

    Chest.initChests(
      this,
      updatedMap.map,
      this.physics,
      this.player,
      chestID.normalChest
    );

    Enemy.initEnemy(
      this,
      updatedMap.map,
      this.physics,
      this.player,
      updatedMap.wallsLayer,
      enemyID.normalEnemy
    );
    this.physics.add.collider(this.player, updatedMap.wallsLayer);
  }

  update(): void {
    this.player.update();
  }
}
