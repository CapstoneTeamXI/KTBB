import { useEffect, useState } from 'react';
import styles from './Game.module.css';
import config from '../config';
import usePhaser from '../hooks/usePhaser';
import { useFullscreen } from 'ahooks';
import { UIScene } from '../scenes/';

export default function Game() {
  const { game, gameContainer } = usePhaser(config);
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(gameContainer);
  const [score, setScore] = useState(`00:00:00`);
  // let scene: UIScene;

  // console.log(game);
  // console.log(gameContainer);

  // let hour = 0;
  // let minute = 0;
  // let second = 0;

  // function myTimer() {
  //   second++;

  //   if (second === 60) {
  //     second = 0;
  //     minute++;
  //   }
  //   if (minute === 60) {
  //     minute = 0;
  //     hour++;
  //   }

  //   let secondStr = second < 10 ? `0${second}` : `${second}`;
  //   let minuteStr = minute < 10 ? `0${minute}` : `${minute}`;
  //   let hourStr = hour < 10 ? `0${hour}` : `${hour}`;

  //   // console.log(`${hourStr}:${minuteStr}:${secondStr}`);
  //   return `${hourStr}:${minuteStr}:${secondStr}`;
  // }

  // useEffect(() => {
  //   if (game.current && gameContainer.current) {
  //     game.current.events.addListener('REACT_EVENT', (event: PhaserEvent) => {
  //       console.log('gameEndHandler triggered');
  //       if (event.action === 'STOP_TIMER') {
  //         setScore(`00:00:00`);
  //       }
  //     });
  //     setInterval(() => {
  //       setScore(myTimer());
  //     }, 1000);
  //   }
  // }, []);

  return (
    <div className={styles.game}>
      <div className={styles.gameContainer} ref={gameContainer}>
        <header>
          <h1>Kill The Big Bad</h1>
          {/* <div className={styles.score}>{score}</div> */}
        </header>
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
}
