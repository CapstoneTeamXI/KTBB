import { Scene, Tilemaps } from "phaser";
import { Player } from "../../classes/player";
import { Enemy } from "../../classes/enemy";
import { Chest } from "../../classes/chest";
import { Map } from "../../classes/map";
import { chestID, enemyID } from "../../consts";

export class Level1 extends Scene {
  constructor() {
    super("level-1-scene");
  }

  private player!: Player;
  private map!: Tilemaps.Tilemap;
  private tileset!: Tilemaps.Tileset;
  private wallsLayer!: Tilemaps.DynamicTilemapLayer;
  private groundLayer!: Tilemaps.DynamicTilemapLayer;
  private enemy!: Enemy[];

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
      "dungeon"
    );
    this.player = new Player(this, 800, 1600);
    this.initCamera();

    Chest.initChests(
      this,
      updatedMap.map,
      this.physics,
      this.player,
      chestID.normalChest,
      "ChestPoint"
    );

    Enemy.initEnemy(
      this,
      updatedMap.map,
      this.physics,
      this.player,
      updatedMap.wallsLayer,
      enemyID.level1Orc,
      "Enemies",
      "EnemyPoint"
    );

    setInterval(() => {
      if (this.player.level === 2) {
        Enemy.initEnemy(
          this,
          updatedMap.map,
          this.physics,
          this.player,
          updatedMap.wallsLayer,
          enemyID.level2Orc,
          "Respawn",
          "RespawnPoint"
        );
      }
      if (this.player.level === 3) {
        Enemy.initEnemy(
          this,
          updatedMap.map,
          this.physics,
          this.player,
          updatedMap.wallsLayer,
          enemyID.level3Orc,
          "Respawn",
          "RespawnPoint"
        );
      }
      if (this.player.level >= 4) {
        Enemy.initEnemy(
          this,
          updatedMap.map,
          this.physics,
          this.player,
          updatedMap.wallsLayer,
          enemyID.level4Orc,
          "Respawn",
          "RespawnPoint"
        );
      }
    }, 60000);
    this.physics.add.collider(this.player, updatedMap.wallsLayer);

    this.sound.play("vopna", {
      mute: false,
      volume: 0.1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    });
  }

  update(): void {
    this.player.update();
  }
}
