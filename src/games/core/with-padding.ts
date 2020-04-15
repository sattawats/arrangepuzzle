import * as createjs from 'createjs-module';
import { Point } from './point';

export class WithPadding extends createjs.Container {

	private static DEFAULT_COLOR = '#2E5252';
	private static RADIUS = 0.05;

	private size: Point;

	constructor(child: createjs.Container,
		childSize: Point,
		paddingSize: number,
		color: string = WithPadding.DEFAULT_COLOR) {
		super();

		const rect = new createjs.Rectangle(0, 0, childSize.x, childSize.y)

		this.addBackground(rect.width + (paddingSize * 2.0), rect.height + (paddingSize * 2.0), color);

		child.x = rect.x + paddingSize;
		child.y = rect.y + paddingSize;
		this.addChild(child);

		const maxSide = Math.max(childSize.x, childSize.y);

		this.size = new Point(maxSide + (paddingSize * 2), maxSide + (paddingSize * 2));
	}

	private addBackground(width: number, height: number, color: string) {
		const rect = new createjs.Shape();
		rect.graphics.beginFill(color).drawRoundRect(0, 0, width, height, WithPadding.RADIUS * width);
		return this.addChildAt(rect, 0);
	}

	public boardSize() {
		return this.size;
	}

}