import { Scene } from "phaser";

export class LoadingScene extends Scene {
  constructor() {
    super("loading-scene");
  }

  preload(): void {
    // this.load.baseURL = 'assets/';

    this.load.image("king", "sprites/king.png");
    this.load.image("knight", "sprites/knight.png");

    this.load.atlas(
      "a-king",
      "spritesheets/a-king.png",
      "spritesheets/a-king_atlas.json"
    );
    this.load.atlas(
      "knight_atlas",
      "spritesheets/knight.png",
      "spritesheets/knight_atlas.json"
    );

    this.load.image({
      key: "tiles",
      url: "tilemaps/tiles/dungeon-16-16.png",
    });

    this.load.tilemapTiledJSON("dungeon", "tilemaps/json/dungeon.json");

    this.load.spritesheet("tiles_spr", "tilemaps/tiles/dungeon-16-16.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.audio("vopna", ["audio/music/Vopna.wav"]);
    this.load.audio("hammerSwipe", ["audio/fx/hammerSwipe.wav"]);
    this.load.audio("pickupChest", ["audio/fx/pickupChest.wav"]);
    // this.load.audio("killEnemy", ["audio/fx/hammerSwipe.wav"]);
  }

  create(): void {
    this.scene.start("level-1-scene");
    this.scene.start("ui-scene");
  }
}
