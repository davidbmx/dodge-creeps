import Character from './Character';

export default class AnimateSprint<T extends string> {
	private elementAnimated: Character;
	private ctx: CanvasRenderingContext2D;
	public animation: T | undefined;
	private sprints: Record<T, HTMLImageElement[]>;
	private animationStart = false;
	private frame = 0;
	private fps = 10;
	private playerFrame = 0;

	constructor(
		frames: Record<T, HTMLImageElement[]>,
		elementAnimated: Character,
		ctx: CanvasRenderingContext2D,
	) {
		this.elementAnimated = elementAnimated;
		this.sprints = frames;
		this.ctx = ctx;
		this.draw();
	}

	public draw() {
		if (!this.animation) {
			return;
		}

		this.ctx.drawImage(
			this.sprints[this.animation][this.frame],
			this.elementAnimated.position.x,
			this.elementAnimated.position.y,
			this.elementAnimated.width,
			this.elementAnimated.height,
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
