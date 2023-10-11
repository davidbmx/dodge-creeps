import Enemy from './Enemy';
import Keyboard from './Keyboard';
import Player from './Player';

export default class Game {
	public dodgeCanvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
	public keys: string[] = [];
	public screenWidth = 450;
	public screenHeight = 720;
	public player: Player;
	public enemies: Enemy[];
	public lastTime: number = 0;
	private waitTimeEnemy = 50;
	private waitTimeCount = 0;
	public squarePoints: number[][] = [];

	constructor(canvasId: string) {
		this.dodgeCanvas = document.getElementById(canvasId) as HTMLCanvasElement;
		this.ctx = this.dodgeCanvas.getContext('2d') as CanvasRenderingContext2D;
		this.dodgeCanvas.width = this.screenWidth;
		this.dodgeCanvas.height = this.screenHeight;
		this.player = new Player(this);
		this.enemies = [];
		new Keyboard(this);
	}

	public draw() {
		this.player.draw();
		this.enemies.forEach(enemy => {
			enemy.draw();
		});
	}

	public update(_: number) {
		this.player.update();
		this.enemies.forEach(enemy => {
			enemy.update();
		});
		this.createNewEnemies();
	}

	private createNewEnemies() {
		if (this.waitTimeCount + 1 >= this.waitTimeEnemy) {
			this.enemies.push(new Enemy(this));
			this.waitTimeCount = 0;
		}
		this.waitTimeCount += 1;
	}

	public renderFrame(timeStamp: number) {
		const deltaTime = timeStamp - this.lastTime;
		this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
		this.update(deltaTime);
		this.draw();
		requestAnimationFrame(props => this.renderFrame(props));
	}

	public start() {
		this.renderFrame(0);
	}
}
