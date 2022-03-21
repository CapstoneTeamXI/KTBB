import { Scene, Tilemaps } from 'phaser';
import { Player } from '../classes/player';
import { gameObjectsToObjectPoints } from '../helpers/gameobject-to-object-point';
import { EVENTS_NAME } from '../consts';

export class Chest {
  constructor() {}

  static initChests(
    scene: Phaser.Scene,
    map: Tilemaps.Tilemap,
    physics: Scene['physics'],
    player: Player,
    chestType: number
  ) {
    const chestPoints = gameObjectsToObjectPoints(
      map.filterObjects('Chests', (obj) => obj.name === 'ChestPoint')
    );
    const chests = chestPoints.map((chestPoint) =>
      physics.add
        .sprite(chestPoint.x, chestPoint.y, 'tiles_spr', chestType)
        .setScale(1.5)
    );
    chests.forEach((chest) => {
      physics.add.overlap(player, chest, (obj1, obj2) => {
        scene.game.events.emit(EVENTS_NAME.chestLoot);
        obj2.destroy();
        scene.cameras.main.flash();
      });
    });
  }
}
