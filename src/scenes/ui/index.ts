import { Scene } from 'phaser';
import { Score, ScoreOperations } from '../../classes/score';
import { EVENTS_NAME, GameStatus } from '../../consts';
import { Text } from '../../classes/text';
import { Timer } from '../../classes/timer';

export class UIScene extends Scene {
  private score!: Score;
  private keyChestHandler: () => void;
  private coinChestHandler: () => void;
  private monsterChestHandler: () => void;
  private timer!: Timer;
  private enemyKilledHandler: () => void;
  private gameEndPhrase!: Text;
  private gameEndHandler: (status: GameStatus) => void;
  private alive = true;
  private interval: NodeJS.Timer;

  constructor() {
    super("ui-scene");
    this.keyChestHandler = () => {
      this.score.changeValue(ScoreOperations.INCREASE, 10);
      this.sound.play('pickupChest', { volume: 0.1 });
    };
    this.coinChestHandler = () => {
      this.score.changeValue(ScoreOperations.INCREASE, 50);
      this.sound.play("pickupChest", { volume: 0.1 });
    };
    this.monsterChestHandler = () => {
      this.score.changeValue(ScoreOperations.INCREASE, 100);
      this.sound.play("pickupChest", { volume: 0.1 });
    };
    this.enemyKilledHandler = () => {
      this.score.changeValue(ScoreOperations.INCREASE, 10);
    };
    this.gameEndHandler = (status) => {
      this.cameras.main.setBackgroundColor('rgba(0,0,0,0.6)');
      this.game.scene.pause('level-1-scene');
      this.gameEndPhrase = new Text(
        this,
        this.game.scale.width / 2,
        this.game.scale.height * 0.4,
        status === GameStatus.LOSE
          ? `YOU'VE BEEN SLAIN!\nCLICK TO RESTART`
          : `YOU ARE VICTORIOUS!\nCLICK TO RESTART`
      )
        .setAlign('center')
        .setColor(status === GameStatus.LOSE ? '#ff0000' : '#ffffff');
      this.gameEndPhrase.setPosition(
        this.game.scale.width / 2 - this.gameEndPhrase.width / 2,
        this.game.scale.height * 0.4
      );
      this.alive = false;
      this.input.on("pointerdown", () => {
        this.game.events.off(EVENTS_NAME.keyChest, this.keyChestHandler);
        this.game.events.off(EVENTS_NAME.coinChest, this.coinChestHandler);
        this.game.events.off(
          EVENTS_NAME.monsterChest,
          this.monsterChestHandler
        );
        this.game.events.off(EVENTS_NAME.gameEnd, this.gameEndHandler);
        this.scene.get('level-1-scene').scene.restart();
        this.scene.restart();
        this.alive = true;
        if (this.interval) {
          clearInterval(this.interval);
        }
      });
    };
  }

  private initListeners(): void {
    this.game.events.on(EVENTS_NAME.keyChest, this.keyChestHandler, this);
    this.game.events.on(EVENTS_NAME.coinChest, this.coinChestHandler, this);
    this.game.events.on(
      EVENTS_NAME.monsterChest,
      this.monsterChestHandler,
      this
    );
    this.game.events.on(EVENTS_NAME.enemyKilled, this.enemyKilledHandler, this);
    this.game.events.once(EVENTS_NAME.gameEnd, this.gameEndHandler, this);

    this.interval = setInterval(() => {
      if (this.alive === true) {
        this.timer.gameTimer();
      }
    }, 1000);
  }

  create(): void {
    this.score = new Score(this, 20, 20, 0);
    this.timer = new Timer(this, this.game.scale.width * 0.4, 20);
    this.initListeners();
  }
}
