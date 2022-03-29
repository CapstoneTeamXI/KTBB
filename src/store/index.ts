import { applyMiddleware, createStore, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';

const initialState: PlayerState = {
  player: { id: 0, name: '', score: 0, completedTime: '' },
  gameOver: false,
  gameStats: { score: 0, completedTime: '' },
};

// ACTION TYPES
export const ADD_PLAYER = 'ADD_PLAYER';
export const GAME_OVER = 'GAME_OVER';
export const GAME_RESTART = 'GAME_RESTART';
export const GET_GAME_STATS = 'GET_GAME_STATS';

export const _addPlayer = (player: IPlayer) => ({
  type: ADD_PLAYER,
  player,
});

export const gameOver = () => ({
  type: GAME_OVER,
});

export const gameRestart = () => ({
  type: GAME_RESTART,
});

export const getGameStats = (gameStats: IGameStats) => ({
  type: GET_GAME_STATS,
  gameStats,
});

export const addPlayer = (player: IPlayer, navigate: NavigateFunction) => {
  return async (dispatch: DispatchType) => {
    try {
      const { data: playerInfo } = await axios.post('/api/players', player);
      dispatch(_addPlayer(playerInfo));
      navigate('/');
    } catch (err) {
      console.error('Adding player failed');
    }
  };
};

const reducer = (
  state: PlayerState = initialState,
  action: DefineAction
): PlayerState => {
  switch (action.type) {
    case ADD_PLAYER:
      return { ...state, player: action.player };
    case GAME_OVER:
      return { ...state, gameOver: true };
    case GAME_RESTART:
      return { ...state, gameOver: false };
    case GET_GAME_STATS:
      return { ...state, gameStats: action.gameStats };
    default:
      return state;
  }
};

const store: Store<PlayerState, PlayerAction | GameAction> & {
  dispatch: DispatchType;
} = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

export default store;
