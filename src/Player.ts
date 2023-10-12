import AnimateSprint from './AnimateSprint';
import Character from './Character';
import Game from './Game';

type TFrames = 'walk' | 'up';

export default class Player extends Character {
	public playerAnimation: AnimateSprint<TFrames>;

	constructor(game: Game) {
		super(game);
		this.width = 65;
		this.height = 80;
		this.speed = 5;
		this.position = {
			x: this.game.screenWidth / 2 - this.width / 2,
			y: this.game.screenHeight / 2 - this.height / 2,
		};

		const frames: Record<TFrames, HTMLImageElement[]> = {
			walk: [
				document.getElementById('walk1') as HTMLImageElement,
				document.getElementById('walk2') as HTMLImageElement,
			],
			up: [
				document.getElementById('up1') as HTMLImageElement,
				document.getElementById('up2') as HTMLImageElement,
			],
		};

		this.playerAnimation = new AnimateSprint(frames, this, game.ctx);
		this.playerAnimation.animation = 'walk';
		this.hide();
	}

	public start(position: { x: number; y: number }) {
		this.position = position;
		this.show();
	}

	public draw() {
		if (this.isShow()) {
			this.playerAnimation.draw();
		}
	}

	public update() {
		let velocity = {
			x: 0,
			y: 0,
		};

		if (this.game.keys.includes('ArrowRight')) {
			if (this.position.x + this.speed + this.width > this.game.screenWidth) {
				return;
			}
			velocity.x += this.speed;
		}

		if (this.game.keys.includes('ArrowLeft')) {
			if (this.position.x - this.speed < 0) {
				return;
			}
			velocity.x -= this.speed;
		}

		if (this.game.keys.includes('ArrowUp')) {
			if (this.position.y - this.speed < 0) {
				return;
			}
			velocity.y -= this.speed;
		}

		if (this.game.keys.includes('ArrowDown')) {
			if (this.position.y + this.speed + this.height > this.game.screenHeight) {
				return;
			}
			velocity.y += this.speed;
		}

		this.position.x += velocity.x;
		this.position.y += velocity.y;

		if (velocity.x !== 0 || velocity.y !== 0) {
			this.playerAnimation.start();
		} else {
			this.playerAnimation.stop();
		}

		if (velocity.x != 0) {
			this.playerAnimation.animation = 'walk';
		} else if (velocity.y != 0) {
			this.playerAnimation.animation = 'up';
		}
		this.playerAnimation.update();
	}
}
