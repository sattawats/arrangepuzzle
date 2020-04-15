import { Point } from "../core/point";
import Randomize from "../utils/randomize";

export class Level {

	private _board: number[][];
	private _emptyCell: Point;
	private _size: Point;

	constructor(size: Point) {
		this._board = [];
		this._size = size;
		this._emptyCell = new Point(size.x - 1, size.y - 1);

		for (var c = 0; c < size.c(); ++c) {
			this._board[c] = []
			for (var r = 0; r < size.r(); ++r) {
				this._board[c][r] = this.correctNumber(c, r);
			}
		}

		this.shuffle(100 * size.x * size.y);
	}

	public board() {
		return this._board;
	}

	public boardSize() {
		return {
			x: this._board.length, // c
			y: this._board[0].length, // r
		};
	}

	public emptyCell() {
		return this._emptyCell;
	}

	public adjacentToCell(cell: Point) : Point[] {
		var cells = [];
		const x = cell.x;
		const y = cell.y;
		const boardSize = this.boardSize();
		if (x > 0) {
			cells.push(new Point(x - 1, y));
		}
		if (x < boardSize.x - 1) {
			cells.push(new Point(x + 1, y));
		}
		if (y > 0) {
			cells.push(new Point(x, y - 1));
		}
		if (y < boardSize.y - 1) {
			cells.push(new Point(x, y + 1));
		}
		return cells;
	}

	public swap(a: Point, b: Point) {
		const temp = this._board[a.x][a.y];
		this._board[a.x][a.y] = this._board[b.x][b.y];
		this._board[b.x][b.y] = temp;
		if (this._board[a.x][a.y] === 0) {
			this._emptyCell = a;
		} else if (this._board[b.x][b.y] === 0) {
			this._emptyCell = b;
		}
	}

	public correctAnswer() {
		for (var c = 0; c < this._size.c(); ++c) {
			for (var r = 0; r < this._size.r(); ++r) {
				if (this._board[c][r] !== this.correctNumber(c, r)) {
					return false;
				}
			}
		}
		return true;
	}

	private shuffle(c: number) {
		for (var i = 0; i < c; ++i) {
			const cells = this.adjacentToCell(this._emptyCell);
			const cell = Randomize.randomFromArray(cells);
			this.swap(cell, this._emptyCell);
		}
	}

	private correctNumber(c: number, r: number) {
		if (this._emptyCell.c() === c && this._emptyCell.r() === r) {
			return 0;
		}
		return 1 + (c + (r * this._size.c()));
	}

}
