import { Scene } from "phaser";

export class LoadingScene extends Scene {
  constructor() {
    super("loading-scene");
  }

  preload(): void {
    this.load.image("knight", "sprites/knight.png");
    this.load.image("openDoor", "sprites/openDoor.png");
    this.load.image("closedDoor", "sprites/closedDoor.png");
    this.load.image("orcBoss", "sprites/orcBoss.png");
    this.load.image("fireball", "sprites/fireball.png");
    this.load.image("level4orc", "sprites/level4orc.png");

    this.load.atlas(
      "knight_atlas",
      "spritesheets/knight.png",
      "spritesheets/knight_atlas.json"
    );

    this.load.atlas(
      "orcboss_atlas",
      "spritesheets/orcboss.png",
      "spritesheets/orcboss_atlas.json"
    );

    this.load.image({
      key: "tiles",
      url: "tilemaps/tiles/dungeon-16-16.png",
    });

    this.load.tilemapTiledJSON("dungeon", "tilemaps/json/dungeon.json");
    this.load.tilemapTiledJSON("dungeonBoss", "tilemaps/json/dungeonBoss.json");

    this.load.spritesheet("tiles_spr", "tilemaps/tiles/dungeon-16-16.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.audio("monsterVania", ["audio/music/MonsterVania.mp3"]);
    this.load.audio("hammerSwipe", ["audio/fx/hammerSwipe.wav"]);
    this.load.audio("coinChest", ["audio/fx/coinChest.wav"]);
    this.load.audio("keyChest", ["audio/fx/keyChest.wav"]);
  }

  create(): void {
    this.scene.start("level-1-scene");
    // this.scene.start("level-1-boss-scene");
    this.scene.start("ui-scene");
  }
}
