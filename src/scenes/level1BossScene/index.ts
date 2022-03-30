import { Scene, Tilemaps } from "phaser";
import { Player } from "../../classes/player";
import { Map } from "../../classes/map";
import { Level1Boss } from "../../classes/level1Boss";
import { Actor } from "../../classes/actor";
import { Enemy } from "../../classes/enemy";

export class Level1BossScene extends Scene {
  constructor() {
    super("level-1-boss-scene");
  }

  private player!: Player;
  private map!: Tilemaps.Tilemap;
  private tileset!: Tilemaps.Tileset;
  private wallsLayer!: Tilemaps.DynamicTilemapLayer;
  private groundLayer!: Tilemaps.DynamicTilemapLayer;
  private boss!: Level1Boss;
  private fireball!: Actor;
  private fireball2!: Actor;
  private fireball3!: Actor;
  private fireball4!: Actor;
  private fireball5!: Actor;
  private fireball6!: Actor;
  private fireballShot = false;
  private fireball2Shot = false;
  private fireball3Shot = false;
  private fireball4Shot = false;
  private fireball5Shot = false;
  private fireball6Shot = false;
  private enemySpawn = false;
  private enemySpawn2 = false;
  private bossInterval!: NodeJS.Timer;

  private initCamera(): void {
    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    this.cameras.main.setZoom(2);
  }

  create(): void {
    localStorage.setItem("currentScene", JSON.stringify(this.scene.key));
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
    // this.player.attack = 50;

    this.physics.add.collider(this.player, this.wallsLayer);

    this.boss = new Level1Boss(this, 800, 1380, "orcBoss", this.player);
    this.physics.add.collider(this.boss, this.wallsLayer);
    this.physics.add.overlap(this.player, this.boss, (obj1, _) => {
      (obj1 as Player).getDamage(10);
    });

    this.bossInterval = setInterval(() => {
      if (this.boss.bossHP < 600) {
        if (this.fireballShot === false) {
          this.fireballShot = true;
          this.fireball = new Actor(this, 800, 1380, "fireball");
          this.physics.add.collider(this.fireball, this.wallsLayer);
          this.physics.add.overlap(this.player, this.fireball, (obj1, _) => {
            (obj1 as Player).getDamage(5);
          });
          this.fireball.body.velocity.set(
            Math.random() * (150 - 50) + 150,
            Math.random() * 150
          );
          this.fireball.body.bounce.set(1);
        }
      }
      if (this.boss.bossHP <= 500) {
        if (this.fireball2Shot === false) {
          this.fireball2Shot = true;
          this.fireball2 = new Actor(this, 800, 1380, "fireball");
          this.physics.add.collider(this.fireball2, this.wallsLayer);
          this.physics.add.overlap(this.player, this.fireball2, (obj1, _) => {
            (obj1 as Player).getDamage(5);
          });
          this.fireball2.body.velocity.set(
            Math.random() * (150 - 50) + 150,
            Math.random() * 150
          );
          this.fireball2.body.bounce.set(1);
        }
        if (this.enemySpawn === false) {
          const enemy1 = new Enemy(this, 720, 1450, "level4orc", this.player);
          const enemy2 = new Enemy(this, 880, 1450, "level4orc", this.player);
          const enemy3 = new Enemy(this, 720, 1300, "level4orc", this.player);
          const enemy4 = new Enemy(this, 880, 1300, "level4orc", this.player);
          this.physics.add.overlap(this.player, enemy1, (obj1, _) => {
            (obj1 as Player).getDamage(5);
          });
          this.physics.add.overlap(this.player, enemy2, (obj1, _) => {
            (obj1 as Player).getDamage(5);
          });
          this.physics.add.overlap(this.player, enemy3, (obj1, _) => {
            (obj1 as Player).getDamage(5);
          });
          this.physics.add.overlap(this.player, enemy4, (obj1, _) => {
            (obj1 as Player).getDamage(5);
          });
          this.physics.add.collider(enemy1, this.wallsLayer);
          this.physics.add.collider(enemy2, this.wallsLayer);
          this.physics.add.collider(enemy3, this.wallsLayer);
          this.physics.add.collider(enemy4, this.wallsLayer);
          this.physics.add.collider(enemy1, enemy2);
          this.physics.add.collider(enemy1, enemy3);
          this.physics.add.collider(enemy1, enemy4);
          this.physics.add.collider(enemy2, enemy3);
          this.physics.add.collider(enemy2, enemy4);
          this.physics.add.collider(enemy3, enemy4);
          enemy1.enemyHP = 70;
          enemy2.enemyHP = 70;
          enemy3.enemyHP = 70;
          enemy4.enemyHP = 70;
          this.enemySpawn = true;
        }
      }
      if (this.boss.bossHP <= 400) {
        this.boss.bossChase = true;
        if (this.fireball3Shot === false) {
          this.fireball3Shot = true;
          this.fireball3 = new Actor(this, 800, 1380, "fireball");
          this.physics.add.collider(this.fireball3, this.wallsLayer);
          this.physics.add.overlap(this.player, this.fireball3, (obj1, _) => {
            (obj1 as Player).getDamage(5);
          });
          this.fireball3.body.velocity.set(
            Math.random() * (150 - 50) + 150,
            Math.random() * 150
          );
          this.fireball3.body.bounce.set(1);
        }
      }
      if (this.boss.bossHP <= 300) {
        if (this.fireball4Shot === false) {
          this.fireball4Shot = true;
          this.fireball4 = new Actor(this, 800, 1380, "fireball");
          this.physics.add.collider(this.fireball4, this.wallsLayer);
          this.physics.add.overlap(this.player, this.fireball4, (obj1, _) => {
            (obj1 as Player).getDamage(5);
          });
          this.fireball4.body.velocity.set(
            Math.random() * (150 - 50) + 150,
            Math.random() * 150
          );
          this.fireball4.body.bounce.set(1);
        }
      }
      if (this.boss.bossHP <= 200) {
        if (this.fireball5Shot === false) {
          this.fireball5Shot = true;
          this.fireball5 = new Actor(this, 800, 1380, "fireball");
          this.physics.add.collider(this.fireball5, this.wallsLayer);
          this.physics.add.overlap(this.player, this.fireball5, (obj1, _) => {
            (obj1 as Player).getDamage(5);
          });
          this.fireball5.body.velocity.set(
            Math.random() * (150 - 50) + 150,
            Math.random() * 150
          );
          this.fireball5.body.bounce.set(1);
        }
        if (this.enemySpawn2 === false) {
          const enemy1 = new Enemy(this, 720, 1450, "level4orc", this.player);
          const enemy2 = new Enemy(this, 880, 1450, "level4orc", this.player);
          const enemy3 = new Enemy(this, 720, 1300, "level4orc", this.player);
          const enemy4 = new Enemy(this, 880, 1300, "level4orc", this.player);
          this.physics.add.overlap(this.player, enemy1, (obj1, _) => {
            (obj1 as Player).getDamage(10);
          });
          this.physics.add.overlap(this.player, enemy2, (obj1, _) => {
            (obj1 as Player).getDamage(10);
          });
          this.physics.add.overlap(this.player, enemy3, (obj1, _) => {
            (obj1 as Player).getDamage(10);
          });
          this.physics.add.overlap(this.player, enemy4, (obj1, _) => {
            (obj1 as Player).getDamage(10);
          });
          this.physics.add.collider(enemy1, this.wallsLayer);
          this.physics.add.collider(enemy2, this.wallsLayer);
          this.physics.add.collider(enemy3, this.wallsLayer);
          this.physics.add.collider(enemy4, this.wallsLayer);
          this.physics.add.collider(enemy1, enemy2);
          this.physics.add.collider(enemy1, enemy3);
          this.physics.add.collider(enemy1, enemy4);
          this.physics.add.collider(enemy2, enemy3);
          this.physics.add.collider(enemy2, enemy4);
          this.physics.add.collider(enemy3, enemy4);
          enemy1.enemyHP = 100;
          enemy2.enemyHP = 100;
          enemy3.enemyHP = 100;
          enemy4.enemyHP = 100;
          this.enemySpawn2 = true;
        }
      }
      if (this.boss.bossHP <= 100) {
        if (this.fireball6Shot === false) {
          this.fireball6Shot = true;
          this.fireball6 = new Actor(this, 800, 1380, "fireball");
          this.physics.add.collider(this.fireball6, this.wallsLayer);
          this.physics.add.overlap(this.player, this.fireball6, (obj1, _) => {
            (obj1 as Player).getDamage(5);
          });
          this.fireball6.body.velocity.set(
            Math.random() * (150 - 50) + 150,
            Math.random() * 150
          );
          this.fireball6.body.bounce.set(1);
        }
      }
    }, 0);
  }

  update(): void {
    this.player.update();
    this.boss.update();
    if (this.player.hp <= 0) {
      this.fireballShot = false;
      this.fireball2Shot = false;
      this.fireball3Shot = false;
      this.fireball4Shot = false;
      this.fireball5Shot = false;
      this.fireball6Shot = false;
      this.enemySpawn = false;
      this.enemySpawn2 = false;
    }
    if (this.boss.bossHP <= 0) {
      this.fireball.destroy();
      this.fireball2.destroy();
      this.fireball3.destroy();
      this.fireball4.destroy();
      this.fireball5.destroy();
      this.fireball6.destroy();
      if (this.bossInterval) {
        clearInterval(this.bossInterval);
      }
    }
  }
}
