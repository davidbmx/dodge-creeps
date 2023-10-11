import Game from './Game';

window.addEventListener('load', () => {
	const game = new Game('dodge-canvas');
	game.start();
});
