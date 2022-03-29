/// <reference types="react-scripts" />

interface Window {
  sizeChanged: () => void;
  game: Phaser.Game;
}

interface PhaserEvent {
  action: string;
  payload?: any;
}

type ObjectPoint = {
  height: number;
  id: number;
  name: string;
  point: boolean;
  rotation: number;
  type: string;
  visible: boolean;
  width: number;
  x: number;
  y: number;
};

interface IPlayer {
  id?: number;
  name: string;
  score: number;
  completedTime: string;
}

interface IGameStats {
  score: number;
  completedTime: string;
}

type DispatchType = (args: PlayerAction) => PlayerAction;
type PlayerAction = {
  type: string;
  player: IPlayer;
  gameStats?: IGameStats;
};

type GameAction = {
  type: string;
  player: IPlayer;
  gameStats: IGameStats;
};

type DefineAction = PlayerAction | GameAction;

type PlayerState = {
  player?: IPlayer;
  gameOver: boolean;
  gameStats?: IGameStats;
};

// type AppDispatch = typeof store.dispatch;
