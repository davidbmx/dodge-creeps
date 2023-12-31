import Game from './Game';

export default class Character {
	public game: Game;
	public width = 0;
	public height = 0;
	public speed = 0;
	public isDeleted = false;
	private showPlayer = true;
	public position = {
		x: 0,
		y: 0,
	};

	constructor(game: Game) {
		this.game = game;
	}

	public show() {
		this.showPlayer = true;
	}

	public hide() {
		this.showPlayer = false;
	}

	public isShow() {
		return this.showPlayer;
	}
}
