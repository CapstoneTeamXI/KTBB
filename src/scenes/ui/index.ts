import { Scene } from "phaser";
import { Score, ScoreOperations } from "../../classes/score";
import { EVENTS_NAME, GameStatus } from "../../consts";
import { Text } from "../../classes/text";
import { BossKeyContainer } from "../../classes/bossKeyContainer";

export class UIScene extends Scene {
  private score!: Score;
  private bossKey!: BossKeyContainer;
  private keyChestHandler: () => void;
  private coinChestHandler: () => void;
  private monsterChestHandler: () => void;
  private enemyKilledHandler: () => void;
  private gameEndPhrase!: Text;
  private gameEndHandler: (status: GameStatus) => void;

  constructor() {
    super("ui-scene");
    this.keyChestHandler = () => {
      this.bossKey.addBossKey();
      this.score.changeValue(ScoreOperations.INCREASE, 10);
      this.sound.play("keyChest", { volume: 0.1 });
    };
    this.coinChestHandler = () => {
      this.score.changeValue(ScoreOperations.INCREASE, 50);
      this.sound.play("coinChest", { volume: 0.1 });
    };
    this.monsterChestHandler = () => {
      this.score.changeValue(ScoreOperations.INCREASE, 100);
      this.sound.play("pickupChest", { volume: 0.1 });
    };
    this.enemyKilledHandler = () => {
      this.score.changeValue(ScoreOperations.INCREASE, 10);
    };
    this.gameEndHandler = (status) => {
      this.cameras.main.setBackgroundColor("rgba(0,0,0,0.6)");
      this.game.scene.pause("level-1-scene");
      this.gameEndPhrase = new Text(
        this,
        this.game.scale.width / 2,
        this.game.scale.height * 0.4,
        status === GameStatus.LOSE
          ? `YOU'VE BEEN SLAIN!\nCLICK TO RESTART`
          : `YOU ARE VICTORIOUS!\nCLICK TO RESTART`
      )
        .setAlign("center")
        .setColor(status === GameStatus.LOSE ? "#ff0000" : "#ffffff");
      this.gameEndPhrase.setPosition(
        this.game.scale.width / 2 - this.gameEndPhrase.width / 2,
        this.game.scale.height * 0.4
      );
      this.input.on("pointerdown", () => {
        this.game.events.off(EVENTS_NAME.keyChest, this.keyChestHandler);
        this.game.events.off(EVENTS_NAME.coinChest, this.coinChestHandler);
        this.game.events.off(
          EVENTS_NAME.monsterChest,
          this.monsterChestHandler
        );

        this.game.events.off(EVENTS_NAME.gameEnd, this.gameEndHandler);
        this.scene.get("level-1-scene").scene.restart();
        this.scene.restart();
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
  }

  create(): void {
    this.score = new Score(this, 20, 20, 0);
    this.bossKey = new BossKeyContainer(this, 20, 100, 0);
    this.initListeners();
  }
}
