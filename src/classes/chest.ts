import { Scene, Tilemaps } from "phaser";
import { Player } from "../classes/player";
import { gameObjectsToObjectPoints } from "../helpers/gameobject-to-object-point";
import { EVENTS_NAME } from "../consts";

export class Chest {
  static initChests(
    scene: Phaser.Scene,
    map: Tilemaps.Tilemap,
    physics: Scene["physics"],
    player: Player,
    chestType: number,
    key: string
  ) {
    const chestPoints = gameObjectsToObjectPoints(
      map.filterObjects("Chests", (obj) => obj.name === key)
    );
    const chests = chestPoints.map((chestPoint) =>
      physics.add
        .sprite(chestPoint.x, chestPoint.y, "tiles_spr", chestType)
        .setScale(1.5)
    );
    chests.forEach((chest) => {
      physics.add.overlap(player, chest, (_, obj2) => {
        scene.game.events.emit(EVENTS_NAME.chestLoot);
        obj2.destroy();
        scene.cameras.main.flash();
      });
    });
  }
}
