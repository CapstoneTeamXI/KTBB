import { Scene, Tilemaps } from 'phaser';

export class Map {
  constructor() {}

  static initMap(
    scene: Phaser.Scene,
    map: Tilemaps.Tilemap,
    tileset: Tilemaps.Tileset,
    groundLayer: Tilemaps.DynamicTilemapLayer,
    wallsLayer: Tilemaps.DynamicTilemapLayer,
    physics: Scene['physics']
  ) {
    map = scene.make.tilemap({
      key: 'dungeon',
      tileWidth: 16,
      tileHeight: 16,
    });
    tileset = map.addTilesetImage('dungeon', 'tiles');
    groundLayer = map.createDynamicLayer('Ground', tileset, 0, 0);
    wallsLayer = map.createDynamicLayer('Walls', tileset, 0, 0);
    physics.world.setBounds(0, 0, wallsLayer.width, wallsLayer.height);
    wallsLayer.setCollisionByProperty({ collides: true });
    const showDebugWalls: Function = () => {
      const debugGraphics = scene.add.graphics().setAlpha(0.7);
      wallsLayer.renderDebug(debugGraphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
      });
    };
    showDebugWalls(); //shows collision
    return { map, tileset, groundLayer, wallsLayer };
  }
}
