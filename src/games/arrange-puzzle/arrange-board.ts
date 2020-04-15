import * as createjs from 'createjs-module';

import { Point } from '../core/point';
import { NumberTile } from '../core/number-tile';
import { Level } from './arrange-level';

type BoardCallback = (win: boolean, moves: number) => void;

export class Board extends createjs.Container {

	public static BOARD_SIZE: number = 800;

	private level: Level;
	private numberOfRows: number = 0;
	private numberOfColumns: number = 0;
	private tiles: NumberTile[] = [];
	private attempts: number = 0;
	private callback: BoardCallback;
	private tileWidth: number;
	private draggedTile: NumberTile | undefined;
	private win: boolean = false;

	constructor(level: Level, callback: BoardCallback) {
		super();
		this.level = level;
		this.callback = callback;

		const board = this.level.board();
		const boardSize = this.level.boardSize();
		this.numberOfRows = boardSize.y;
		this.numberOfColumns = boardSize.x;
		this.tileWidth = Board.BOARD_SIZE / Math.max(this.numberOfColumns, this.numberOfRows);

		for (let c = 0; c < this.numberOfColumns; c++) {
			for (let r = 0; r < this.numberOfRows; r++) {

				const pos = new Point(c * this.tileWidth, r * this.tileWidth);
				const s = new Point(this.tileWidth, this.tileWidth);
				const tile = new NumberTile(pos, s);

				tile.r = r;
				tile.c = c;
				tile.x = (c * this.tileWidth) + tile.regX;
				tile.y = (r * this.tileWidth) + tile.regY;
				const n = board[c][r];
				tile.setNumber(n);

				if (n === 0) {
					tile.alpha = 0;
				} else {
					this.addChild(tile);
					this.tiles.push(tile);
				}
			}
		}

		this.on('mousedown', (evt: any) => {
			this.handleMouseDownEvent(evt);
		});

		this.on('pressmove', (evt: any) => {
			this.handleMouseEvent(evt);
		});

		this.on('pressup', (evt: any) => {
			this.handleMouseUpEvent(evt);
		});
	}

	private handleMouseDownEvent(evt: any) {
		const target = new Point(evt.stageX - this.x, evt.stageY - this.y);
		const tile = this.findTile(target);
		if (tile === undefined) {
			return;
		}

		const emptyCell = this.level.emptyCell();
		const cells = this.level.adjacentToCell(emptyCell);
		const adjacent = cells.find(c => c.x === tile.c && c.y === tile.r);
		if (adjacent === undefined) {
			return;
		}

		this.draggedTile = tile;
	}

	private handleMouseEvent(evt: any) {
		const tile = this.draggedTile;
		if (tile === undefined) {
			return;
		}

		const target = { x: evt.stageX - this.x, y: evt.stageY - this.y };
		const emptyCell = this.level.emptyCell();
		const width = this.tileWidth;
		const half = width / 2;

		if (emptyCell.x === tile.c) {
			tile.y = this.capBetween(target.y, (tile.r * width) + half, (emptyCell.y * width) + half);
		}
		if (emptyCell.y === tile.r) {
			tile.x = this.capBetween(target.x, (tile.c * width) + half, (emptyCell.x * width) + half);
		}

		this.stage.update();
	}

	private handleMouseUpEvent(evt: any) {
		const tile = this.draggedTile;
		if (tile === undefined) {
			return;
		}

		const c = Math.floor(tile.x / this.tileWidth);
		const r = Math.floor(tile.y / this.tileWidth);
		const emptyCell = this.level.emptyCell();

		if (emptyCell.x === c && emptyCell.y === r) {
			const cell = new Point(tile.c, tile.r);
			this.level.swap(emptyCell, cell);
			tile.r = emptyCell.y;
			tile.c = emptyCell.x;
			this.attempts += 1;
		}

		tile.x = (tile.c * this.tileWidth) + tile.regX;
		tile.y = (tile.r * this.tileWidth) + tile.regY;
		this.draggedTile = undefined;
		this.stage.update();

		if (this.level.correctAnswer() && !this.win) {
			this.win = true;
		}
		this.callback(this.win, this.attempts);
	}

	private capBetween(target: number, a: number, b: number) {
		if (a > b) {
			return Math.max(b, Math.min(a, target));
		} else {
			return Math.max(a, Math.min(b, target));
		}
	}

	private findTile(target: Point): NumberTile | undefined {
		const c = Math.floor(target.x / this.tileWidth);
		const r = Math.floor(target.y / this.tileWidth);
		const tile = this.tiles.find(t => t.r === r && t.c === c);
		return tile;
	}

}
