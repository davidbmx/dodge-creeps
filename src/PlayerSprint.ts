import { Player } from './Player';

type TAnimation = 'walk' | 'up';

export class PlayerSprint {
	public animation: TAnimation = 'walk';
	private player: Player;
	private sprints: Record<TAnimation, HTMLImageElement[]>;
	private animationStart = false;
	private frame = 0;
	private fps = 10;
	private playerFrame = 0;

	constructor(player: Player) {
		this.player = player;
		this.sprints = {
			walk: [
				document.getElementById('walk1') as HTMLImageElement,
				document.getElementById('walk2') as HTMLImageElement,
			],
			up: [
				document.getElementById('up1') as HTMLImageElement,
				document.getElementById('up2') as HTMLImageElement,
			],
		};
		this.draw();
	}

	public draw() {
		this.player.game.ctx.drawImage(
			this.sprints[this.animation][this.frame],
			this.player.positionX,
			this.player.positionY,
			this.player.width,
			this.player.height,
		);
	}

	public update() {
		if (this.animationStart) {
			if (this.playerFrame + 1 >= this.fps) {
				this.frame = this.frame === 0 ? 1 : 0;
				this.playerFrame = 0;
			} else {
				this.playerFrame += 1;
			}
		} else {
			this.frame = 0;
			this.playerFrame = 0;
		}
	}

	public start() {
		this.animationStart = true;
	}

	public stop() {
		this.animationStart = false;
	}
}
