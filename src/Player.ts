import { Game } from "./Game";
import { PlayerSprint } from "./PlayerSprint";

export class Player {
  public game: Game;
  public width = 65;
  public height = 80;
  public speed = 5;
  public positionX = 20;
  public positionY = 20;
  public playerAnimation: PlayerSprint;

  constructor(game: Game) {
    this.game = game;
    this.playerAnimation = new PlayerSprint(this);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.playerAnimation.draw();
    // ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
  }

  public update() {
    let position = {
      x: 0,
      y: 0,
    };
    if (this.game.keys.includes("ArrowRight")) {
      if (this.positionX + this.speed + this.width > this.game.screenWidth) {
        return;
      }
      position.x += this.speed;
    }

    if (this.game.keys.includes("ArrowLeft")) {
      if (this.positionX - this.speed < 0) {
        return;
      }
      position.x -= this.speed;
    }

    if (this.game.keys.includes("ArrowUp")) {
      if (this.positionY - this.speed < 0) {
        return;
      }
      position.y -= this.speed;
    }

    if (this.game.keys.includes("ArrowDown")) {
      if (this.positionY + this.speed + this.height > this.game.screenHeight) {
        this.positionX;
      }
      position.y += this.speed;
    }

    this.positionX += position.x;
    this.positionY += position.y;

    if (position.x !== 0 || position.y !== 0) {
      this.playerAnimation.start();
    } else {
      this.playerAnimation.stop();
    }

    if (position.x != 0) {
      this.playerAnimation.animation = "walk";
    } else if (position.y != 0) {
      this.playerAnimation.animation = "up";
    }
    this.playerAnimation.update();
  }
}
