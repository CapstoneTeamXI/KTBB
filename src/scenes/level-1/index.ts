import { GameObjects, Scene, Tilemaps } from "phaser";
import { Player } from "../../classes/player";

export class Level1 extends Scene {
  private player!: Player;
  private map!: Tilemaps.Tilemap;
  private tileset!: Tilemaps.Tileset;
  private wallsLayer!: Tilemaps.DynamicTilemapLayer;
  private groundLayer!: Tilemaps.DynamicTilemapLayer;

  private initMap(): void {
    this.map = this.make.tilemap({
      key: "dungeon",
      tileWidth: 16,
      tileHeight: 16,
    });
    this.tileset = this.map.addTilesetImage("dungeon", "tiles");
    this.groundLayer = this.map.createDynamicLayer(
      "Ground",
      this.tileset,
      0,
      0
    );
    this.wallsLayer = this.map.createDynamicLayer("Walls", this.tileset, 0, 0);
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
    super("level-1-scene");
  }

  private showDebugWalls(): void {
    const debugGraphics = this.add.graphics().setAlpha(0.7);
    this.wallsLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    });
  }

  create(): void {
    this.initMap();
    this.player = new Player(this, 100, 100);
  }

  update(): void {
    this.player.update();
  }
}
