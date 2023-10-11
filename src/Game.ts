import { Keyboard } from "./Keyboard";
import { Player } from "./Player";

export class Game {
  public dodgeCanvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public keys: string[] = [];
  public screenWidth = 450;
  public screenHeight = 720;
  public player: Player;
  public lastTime: number = 0;

  constructor(canvasId: string) {
    this.dodgeCanvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.dodgeCanvas.getContext("2d") as CanvasRenderingContext2D;
    this.dodgeCanvas.width = this.screenWidth;
    this.dodgeCanvas.height = this.screenHeight;
    this.player = new Player(this);
    new Keyboard(this);
  }

  public draw() {
    this.player.draw(this.ctx);
  }

  public update(_: number) {
    this.player.update();
  }

  public renderFrame(timeStamp: number) {
    const deltaTime = timeStamp - this.lastTime;
    this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
    this.update(deltaTime);
    this.draw();
    requestAnimationFrame((props) => this.renderFrame(props));
  }

  public start() {
    this.renderFrame(0);
  }
}
