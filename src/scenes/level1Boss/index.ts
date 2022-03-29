import { Scene, Tilemaps } from "phaser";
import { Player } from "../../classes/player";
import { Map } from "../../classes/map";

export class Level1Boss extends Scene {
  constructor() {
    super("level-1-boss-scene");
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
      this.physics,
      "dungeonBoss"
    );

    this.wallsLayer = updatedMap.wallsLayer;

    this.player = new Player(this, 800, 1550);
    this.player.level = parseInt(localStorage.getItem("playerLevel")!);
    this.player.hp = parseInt(localStorage.getItem("playerHP")!);
    this.player.attack = parseInt(localStorage.getItem("playerAttack")!);
    this.initCamera();

    this.physics.add.collider(this.player, this.wallsLayer);
  }

  update(): void {
    this.player.update();
  }
}
