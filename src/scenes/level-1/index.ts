import { GameObjects, Scene, Tilemaps } from 'phaser';
import { Player } from '../../classes/player';
import { gameObjectsToObjectPoints } from '../../helpers/gameobject-to-object-point';

export class Level1 extends Scene {
  private player!: Player;
  private map!: Tilemaps.Tilemap;
  private tileset!: Tilemaps.Tileset;
  private wallsLayer!: Tilemaps.DynamicTilemapLayer;
  private groundLayer!: Tilemaps.DynamicTilemapLayer;
  private chests!: Phaser.GameObjects.Sprite[];

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
    this.showDebugWalls();
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
  // private initChests(): void {
  //   const chestPoints = gameObjectsToObjectPoints(
  //     this.map.filterObjects('Chests', obj => obj.name === 'ChestPoint'),
  //   );
  //   this.chests = chestPoints.map(chestPoint =>
  //     this.physics.add.sprite(chestPoint.x, chestPoint.y, 'tiles_spr', 595).setScale(1.5),
  //   );
  //   this.chests.forEach(chest => {
  //     this.physics.add.overlap(this.player, chest, (obj1, obj2) => {
  //       obj2.destroy();
  //       this.cameras.main.flash();
  //     });
  //   });
  //   const monsterChest = gameObjectsToObjectPoints(
  //     this.map.filterObjects('Chests', obj => obj.name === 'MonsterChest'),
  //   );
  //   this.chests = monsterChest.map(monsterChest =>
  //     this.physics.add.sprite(monsterChest.x, monsterChest.y, 'tiles_spr', 661).setScale(1.5),
  //   );
  //   this.chests.forEach(chest => {
  //     this.physics.add.overlap(this.player, chest, (obj1, obj2) => {
  //       obj2.destroy();
  //       this.cameras.main.flash();
  //     });
  //   });
  // }

  create(): void {
    this.initMap();
    this.player = new Player(this, 100, 100);
    // this.initChests();
    this.physics.add.collider(this.player, this.wallsLayer);
  }

  update(): void {
    this.player.update();
  }
}
