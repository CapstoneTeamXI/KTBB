import { useRef, useEffect } from "react";
import Phaser from "phaser";
import type { Types } from "phaser";

export default function usePhaser(config: Types.Core.GameConfig) {
  const game = useRef<Phaser.Game>();
  const gameContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!game.current && gameContainer.current) {
      game.current = new Phaser.Game({
        ...config,
        parent: gameContainer.current,
      });
      // let timeout: NodeJS.Timeout;
      // // CHECK WINDOW RESIZE
      // window.game = game.current;
      // window.sizeChanged = () => {
      //   if (window.game.isBooted) {
      //     if (timeout) {
      //       clearTimeout(timeout);
      //     }
      //     timeout = setTimeout(() => {
      //       window.game.scale.resize(window.innerWidth, window.innerHeight);

      //       window.game.canvas.setAttribute(
      //         'style',
      //         `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
      //       );
      //     }, 100);
      //   }
      // };
      // window.onresize = () => window.sizeChanged();
      // END CHECK WINDOW RESIZE
    }
  }, [config]);

  return {
    game,
    gameContainer,
  };
}
