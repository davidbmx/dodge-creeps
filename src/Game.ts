import Character from './Character';
import Enemy from './Enemy';
import Keyboard from './Keyboard';
import Player from './Player';
import UI from './UI';

export default class Game {
	public dodgeCanvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
	public keys: string[] = [];
	public screenWidth = 450;
	public screenHeight = 720;
	public player: Player;
	public enemies: Enemy[];
	public ui: UI;
	public lastTime: number = 0;
	private waitTimeEnemy = 40;
	private waitTimeCount = 0;
	public isGameStart = false;
	public isGameOver = false;
	public score = 0;
	public fps = 60;
	public fpsCount = 0;

	constructor(canvasId: string) {
		this.dodgeCanvas = document.getElementById(canvasId) as HTMLCanvasElement;
		this.ctx = this.dodgeCanvas.getContext('2d') as CanvasRenderingContext2D;
		this.dodgeCanvas.width = this.screenWidth;
		this.dodgeCanvas.height = this.screenHeight;
		this.player = new Player(this);
		this.ui = new UI(this, this.ctx);
		this.enemies = [];
		new Keyboard(this);
	}

	public draw() {
		this.ui.draw();
		this.player.draw();
		this.enemies.forEach(enemy => {
			enemy.draw();
		});
	}

	public update(deltaTime: number) {
		if (this.isGameStart) {
			if (this.fpsCount + 1 > 60) {
				this.score += 1;
				this.fpsCount = 0;
			}
			this.fpsCount++;
		}
		this.player.update();
		this.enemies.forEach(enemy => {
			if (this.checkCollision(this.player, enemy)) {
				this.gameOver();
			}
			enemy.update();
		});
		this.enemies = this.enemies.filter(enemy => !enemy.isDeleted);
		this.createNewEnemies();
	}

	public startGame() {
		if (this.isGameStart) {
			return;
		}

		const position = {
			x: this.screenWidth / 2 - this.player.width / 2,
			y: this.screenHeight / 2 - this.player.height / 2,
		};
		this.score = 0;
		this.fpsCount = 0;
		this.enemies = [];
		this.player.start(position);
		this.isGameStart = true;
	}

	public gameOver() {
		this.player.hide();
		this.isGameStart = false;
		this.isGameOver = true;
	}

	private createNewEnemies() {
		if (!this.isGameStart) {
			return;
		}

		if (this.waitTimeCount + 1 >= this.waitTimeEnemy) {
			this.enemies.push(new Enemy(this));
			this.waitTimeCount = 0;
		}
		this.waitTimeCount += 1;
	}

	public checkClick(screenX: number, screenY: number) {
		if (this.ctx.isPointInPath(this.ui.button, screenX, screenY)) {
			this.startGame();
		}
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

	public checkCollision(rect1: Character, rect2: Character) {
		return (
			rect1.position.x < rect2.position.x + rect2.width &&
			rect1.position.x + rect1.width > rect2.position.x &&
			rect1.position.y < rect2.position.y + rect2.height &&
			rect1.position.y + rect1.height > rect2.position.y
		);
	}
}
