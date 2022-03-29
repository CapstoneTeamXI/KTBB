// import { useEffect, useState } from 'react';
import styles from './Game.module.css';
import config from '../config';
import usePhaser from '../hooks/usePhaser';
import { useFullscreen } from 'ahooks';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { addPlayer, GAME_RESTART } from '../store';
import { useNavigate } from 'react-router-dom';

export default function Game() {
  const { gameContainer } = usePhaser(config);
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(gameContainer);
  const isGameOver = useSelector((state: PlayerState) => state.gameOver);
  const dispatch = useDispatch();
  const score = useSelector((state: PlayerState) => state.gameStats?.score);
  const completedTime = useSelector(
    (state: PlayerState) => state.gameStats?.completedTime
  );

  const navigate = useNavigate();
  console.log(isGameOver);

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    const target = evt.target as typeof evt.target & {
      playerName: { value: string };
    };
    const playerName = target.playerName.value;
    if (score !== undefined && completedTime !== undefined) {
      const player: IPlayer = {
        name: playerName,
        score: score,
        completedTime: completedTime,
      };
      dispatch(addPlayer(player, navigate));
      dispatch({ type: GAME_RESTART });
    }
  };

  if (!isGameOver) {
    return (
      <div className={styles.game}>
        <div className={styles.gameContainer} ref={gameContainer}>
          <header>
            <h1>Kill The Big Bad</h1>
            {/* <div className={styles.score}>{score}</div> */}
          </header>
          {isGameOver ? <div>Game Over!</div> : null}
          <footer>
            <button
              className={styles.fullscreenButton}
              onClick={() => toggleFullscreen()}
            >
              {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            </button>
          </footer>
        </div>
      </div>
    );
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter name:</label>
          <input name="playerName" type="text" />
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}
