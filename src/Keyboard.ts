import Game from './Game';

export default class Keyboard {
	private gameKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
	constructor(game: Game) {
		window.addEventListener('keydown', ({ code }) => {
			if (this.gameKeys.includes(code) && !game.keys.includes(code)) {
				game.keys.push(code);
			}

			if (code === 'Enter') {
				game.startGame();
			}
		});

		window.addEventListener('keyup', ({ code }) => {
			if (game.keys.includes(code)) {
				game.keys = game.keys.filter(keyCode => keyCode !== code);
			}
		});

		game.dodgeCanvas.addEventListener('mousedown', ev => {
			game.checkClick(ev.offsetX, ev.offsetY);
		});
	}
}
