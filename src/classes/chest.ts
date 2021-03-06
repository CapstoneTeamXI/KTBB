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
    let chestContents = [
      EVENTS_NAME.keyChest,
      EVENTS_NAME.keyChest,
      EVENTS_NAME.keyChest,
      EVENTS_NAME.keyChest,
      EVENTS_NAME.coinChest,
      EVENTS_NAME.coinChest,
      EVENTS_NAME.coinChest,
      EVENTS_NAME.monsterChest,
      EVENTS_NAME.monsterChest,
    ];
    chests.forEach((chest) => {
      chestContents.sort(() => Math.random() - 0.5);
      physics.add.overlap(player, chest, (_, obj2) => {
        scene.game.events.emit(chestContents[0]);
        chestContents.shift();
        obj2.destroy();
      });
    });
  }
}
