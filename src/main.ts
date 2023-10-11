import { Game } from "./Game";
import "./style.css";

window.addEventListener("load", () => {
  const game = new Game("dodge-canvas");
  game.start();
});
