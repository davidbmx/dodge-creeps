import AnimateSprint from './AnimateSprint';
import Character from './Character';
import Game from './Game';

type TFrames = 'walking' | 'swimming' | 'flying';

export default class Enemy extends Character {
	public playerAnimation: AnimateSprint<TFrames>;
	private rotation = 0;
	private direction = {
		x: 0,
		y: 0,
	};

	constructor(game: Game) {
		super(game);
		this.width = 65;
		this.height = 80;
		this.speed = 3;
		this.rotation = this.getRandomArbitrary(-Math.PI / 4, Math.PI / 4);
		const { position, direction } = this.generateRandomSpawn();
		this.position = position;
		this.direction = direction;

		const frames: Record<TFrames, HTMLImageElement[]> = {
			walking: [
				document.getElementById('enemy_walk1') as HTMLImageElement,
				document.getElementById('enemy_walk2') as HTMLImageElement,
			],
			swimming: [
				document.getElementById('enemy_swimming1') as HTMLImageElement,
				document.getElementById('enemy_swimming2') as HTMLImageElement,
			],
			flying: [
				document.getElementById('enemy_flying1') as HTMLImageElement,
				document.getElementById('enemy_flying2') as HTMLImageElement,
			],
		};

		this.playerAnimation = new AnimateSprint(frames, this, game.ctx);
		this.playerAnimation.animation = this.getRandomAnimation();
		this.playerAnimation.start();
	}

	public draw() {
		this.playerAnimation.draw();
	}

	public update() {
		const nextPositionX = this.position.x + this.direction.x;
		const nextPositionY = this.position.y + this.direction.y;
		if (
			nextPositionX > this.game.screenWidth + this.width * 0.5 ||
			this.position.x < -this.width ||
			nextPositionY > this.game.screenHeight + this.height * 0.5 ||
			nextPositionY < -this.height
		) {
			this.isDeleted = true;
		}

		this.position.x = nextPositionX;
		this.position.y = nextPositionY;

		this.playerAnimation.update();
	}

	private getRandomAnimation(): TFrames {
		const animations: TFrames[] = ['flying', 'walking', 'swimming'];
		const randomItem = Math.floor(Math.random() * animations.length);
		return animations[randomItem];
	}

	getRandomArbitrary(min: number, max: number) {
		return Math.random() * (max - min) + min;
	}

	generateRandomSpawn() {
		const randomEdge = Math.floor(Math.random() * 4);
		const position = {
			x: 0,
			y: 0,
		};

		const direction = {
			x: 0,
			y: 0,
		};

		switch (randomEdge) {
			case 0: // top
				position.x = Math.random() * this.game.screenWidth;
				position.y = 0;
				direction.x = this.rotation * this.speed;
				direction.y = this.speed;
				break;
			case 1: // right
				position.x = this.game.screenWidth;
				position.y = Math.random() * this.game.screenHeight;
				direction.x = -this.speed;
				direction.y = this.rotation * this.speed;
				break;
			case 2: // bottom
				position.x = Math.random() * this.game.screenWidth;
				position.y = this.game.screenHeight;
				direction.x = this.rotation * this.speed;
				direction.y = -this.speed;
				break;
			case 3: // left
				position.x = 0;
				position.y = Math.random() * this.game.screenHeight;
				direction.x = this.speed;
				direction.y = this.rotation * this.speed;
				break;
		}

		return { position, direction };
	}
}
