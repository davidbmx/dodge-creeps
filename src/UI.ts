import Game from './Game';

export default class UI {
	private game: Game;
	private ctx: CanvasRenderingContext2D;
	private textColor = '#fff';
	private fontSize = 50;
	private fontFamily = 'Xolonium';
	private maxGameOver = 50;
	private gameOverCount = 0;

	public button: Path2D;

	constructor(game: Game, ctx: CanvasRenderingContext2D) {
		this.game = game;
		this.ctx = ctx;
		this.button = this.createButton();
	}

	public draw() {
		this.ctx.save();
		this.ctx.fillStyle = this.textColor;
		this.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
		this.drawScore();
		if (!this.game.isGameStart) {
			this.drawMessage();
			if (!this.game.isGameOver) {
				this.drawTextButton();
			}
		}

		if (this.gameOverCount + 1 >= this.maxGameOver) {
			this.game.isGameOver = false;
			this.gameOverCount = 0;
		}

		this.ctx.restore();
		this.gameOverCount++;
	}

	public drawScore() {
		this.ctx.fillText(
			String(this.game.score),
			this.game.screenWidth / 2 - 30 - String(this.game.score).length / 1,
			this.fontSize,
		);
	}

	public drawMessage() {
		const message = this.game.isGameOver ? 'Game Over' : 'Dodge the';
		this.ctx.fillText(
			message,
			this.game.screenWidth / 2 - this.fontSize * (message.length / 3.2),
			this.game.screenHeight / 2,
		);

		if (!this.game.isGameOver) {
			this.ctx.fillText(
				'creeps',
				this.game.screenWidth / 2 - this.fontSize * (6 / 3.2),
				this.game.screenHeight / 2 + 60,
			);
		}
	}

	public createButton() {
		const sizeX = 200;
		const sizeY = 60;
		const button = new Path2D();
		button.rect(
			this.game.screenWidth / 2 - sizeX / 2,
			this.game.screenHeight - (sizeY + 20),
			sizeX,
			sizeY,
		);
		return button;
	}

	public drawTextButton() {
		const sizeX = 200;
		const sizeY = 60;
		this.ctx.fillStyle = 'rgba(0, 0, 0, .4)';
		this.ctx.fill(this.button);
		this.ctx.fillStyle = this.textColor;
		this.ctx.fillText(
			'START',
			this.game.screenWidth / 2 - sizeX / 2 + 9,
			this.game.screenHeight - sizeY + 25,
		);
	}
}
