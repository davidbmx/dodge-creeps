import { Game } from "./Game";

export class Keyboard {
  private gameKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  constructor(game: Game) {
    window.addEventListener("keydown", ({ code }) => {
      if (this.gameKeys.includes(code) && !game.keys.includes(code)) {
        game.keys.push(code);
      }
    });

    window.addEventListener("keyup", ({ code }) => {
      if (game.keys.includes(code)) {
        game.keys = game.keys.filter((keyCode) => keyCode !== code);
      }
    });
  }
}
