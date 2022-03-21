import { Scene, Tilemaps } from 'phaser';
import { Player } from '../../classes/player';
import { Enemy } from '../../classes/enemy';
import { Chest } from '../../classes/chest';

export class Level1 extends Scene {
  private player!: Player;
  private map!: Tilemaps.Tilemap;
  private tileset!: Tilemaps.Tileset;
  private wallsLayer!: Tilemaps.DynamicTilemapLayer;
  private groundLayer!: Tilemaps.DynamicTilemapLayer;

  private initMap(): void {
    this.map = this.make.tilemap({
      key: 'dungeon',
      tileWidth: 16,
      tileHeight: 16,
    });
    this.tileset = this.map.addTilesetImage('dungeon', 'tiles');
    this.groundLayer = this.map.createDynamicLayer(
      'Ground',
      this.tileset,
      0,
      0
    );
    this.wallsLayer = this.map.createDynamicLayer('Walls', this.tileset, 0, 0);
    this.physics.world.setBounds(
      0,
      0,
      this.wallsLayer.width,
      this.wallsLayer.height
    );
    this.wallsLayer.setCollisionByProperty({ collides: true });
    this.showDebugWalls(); //shows collision
  }

  constructor() {
    super('level-1-scene');
  }

  private showDebugWalls(): void {
    const debugGraphics = this.add.graphics().setAlpha(0.7);
    this.wallsLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    });
  }

  private initCamera(): void {
    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    this.cameras.main.setZoom(2);
  }

  create(): void {
    this.initMap();
    this.player = new Player(this, 100, 100);
    this.initCamera();
    Chest.initChests(this, this.map, this.physics, this.player, 595);
    Enemy.initEnemy(
      this,
      this.map,
      this.physics,
      this.player,
      this.wallsLayer,
      503
    );
    this.physics.add.collider(this.player, this.wallsLayer);
  }

  update(): void {
    this.player.update();
  }
}
