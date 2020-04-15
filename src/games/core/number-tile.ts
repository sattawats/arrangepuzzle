import * as createjs from 'createjs-module';
import { Point } from './point';

export class NumberTile extends createjs.Container {

	private static MARGIN: number = 5;
	private static RADIUS: number = 0.2;

	public r: number = 0;
	public c: number = 0;
	public n: number = 0;
	
	private size: Point;
	private numberTextNode: createjs.Text;
	private background: createjs.Shape;

	constructor(pos: Point, size: Point) {
		super();

		this.size = size;

		this.regX = (size.x / 2);
		this.regY = (size.y / 2);
		this.x = pos.x + this.regX;
		this.y = pos.y + this.regY;

		this.background = new createjs.Shape();
		this.drawBackground('#085B7E');
		this.addChild(this.background);

		this.numberTextNode = new createjs.Text();
		this.numberTextNode.color = "white";
		const fontSize = Math.floor(size.x / 2.0);
		this.numberTextNode.font = `bold ${fontSize}px Arial`;
		this.numberTextNode.text = "0".toString();
		this.numberTextNode.textAlign = "center";
		this.numberTextNode.textBaseline = "middle";
		this.numberTextNode.x = this.size.x / 2;
		this.numberTextNode.y = this.size.y / 2;
		this.addChild(this.numberTextNode);
	}

	public setNumber(n: number) {
		this.n = n;
		this.numberTextNode.text = n.toString();
	}

	private drawBackground(color: string) {
		var x = NumberTile.MARGIN;
		var y = NumberTile.MARGIN;
		var w = this.size.x - (NumberTile.MARGIN * 2.0);
		var h = this.size.y - (NumberTile.MARGIN * 2.0);
		var r = NumberTile.RADIUS * w;

		const grey = "#BBB";
		this.background.graphics
			.beginFill(grey)
			.drawRoundRect(x, y, w, h, r);
		const inset = Math.floor(this.size.x / 30);
		x = x + inset;
		y = y + inset;
		w = w - (inset * 2);
		h = h - (inset * 2);
		this.background.graphics
			.beginFill(color)
			.drawRoundRect(x, y, w, h, r - (inset / 2));
	}

}