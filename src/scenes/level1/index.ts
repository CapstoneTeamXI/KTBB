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
  private onMap = true;

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

    this.map = updatedMap.map;
    this.wallsLayer = updatedMap.wallsLayer;
    this.player = new Player(this, 800, 1550);
    this.initCamera();

    Chest.initChests(
      this,
      this.map,
      this.physics,
      this.player,
      chestID.normalChest,
      "ChestPoint"
    );

    Enemy.initEnemy(
      this,
      this.map,
      this.physics,
      this.player,
      this.wallsLayer,
      enemyID.level1Orc,
      "Enemies",
      "EnemyPoint"
    );

    setInterval(() => {
      if (this.onMap === true) {
        if (this.player.level === 2) {
          Enemy.initEnemy(
            this,
            this.map,
            this.physics,
            this.player,
            this.wallsLayer,
            enemyID.level2Orc,
            "Respawn",
            "RespawnPoint"
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
            "Respawn",
            "RespawnPoint"
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
            "Respawn",
            "RespawnPoint"
          );
        }
      }
    }, 60000);
    this.physics.add.collider(this.player, this.wallsLayer);

    this.sound.play("vopna", {
      mute: false,
      volume: 0.1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    });

    this.input.on(
      "pointerdown",
      () => {
        this.onMap = false;
        this.scene.start("level-1-boss-scene");
        localStorage.setItem("playerLevel", JSON.stringify(this.player.level));
        localStorage.setItem("playerHP", JSON.stringify(this.player.hp));
        localStorage.setItem(
          "playerAttack",
          JSON.stringify(this.player.attack)
        );
      },
      this
    );
  }

  update(): void {
    this.player.update();
  }
}
