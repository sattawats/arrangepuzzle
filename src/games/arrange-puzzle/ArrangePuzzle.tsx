import React from 'react';
import ResponsiveCanvas from '../../components/ResponsiveCanvas';
import { Container } from 'reactstrap';
import * as createjs from 'createjs-module';

import { Board } from './arrange-board';
import { Level } from './arrange-level';
import ArrangeOptions from './ArrangeOptions';
import { Point } from '../core/point';
import ArrangeScore from './ArrangeScore';
import { WithPadding } from '../core/with-padding';
import { delay } from '../utils/delay';

interface IArrangePuzzleState {
	level: number;
	moves: number;
}

class ArrangePuzzle extends React.Component<{}, IArrangePuzzleState> {

	private stage: createjs.Stage | undefined;
	private board: Board | undefined;

	private score: React.RefObject<ArrangeScore>;

	constructor(props: any) {
		super(props)

		this.state = {
			level: 0,
			moves: 0,
		};

		this.score = React.createRef<ArrangeScore>();
	}

	async componentDidMount() {
		this.stage = new createjs.Stage("game-canvas");
		createjs.Touch.enable(this.stage);
		this.newLevel(4);
	}

	render() {
		const { moves } = this.state;
		return (
			<Container fluid>
				<div className='text-center text-light mt-2 pb-3'>
					<div>Arrange Puzzle</div>
					<div className='pt-2'><h4>Moves: {moves}</h4></div>
				</div>
				<div>
					<ResponsiveCanvas
						canvasId='game-canvas'
						renderWidth={820}
						renderHeight={820}
						maxWidth={550} />
				</div>
				<div className='text-center mt-2'>
					<ArrangeOptions onSizeChanged={this.onSizeChanged} />
				</div>
				<ArrangeScore
					ref={this.score} />
			</Container>
		);
	}

	private newLevel(size: number) {
		const stage = this.stage;
		if (stage === undefined) {
			return;
		}
		stage.removeAllChildren();
		const level = new Level(new Point(size, size));
		this.board = new Board(level, this.onBoardCallback);
		const padding = new WithPadding(this.board, new Point(800, 800), 10);
		stage.addChild(padding);
		stage.update();
	}

	private onBoardCallback = async (win: boolean, moves: number) => {
		this.setState({
			moves,
		});
		if (win) {
			await delay(2000);
			await this.score.current?.show(moves);
			window.location.reload();
		}
	}

	private onSizeChanged = (size: number) => {
		this.newLevel(size);
	}

}

export default ArrangePuzzle;
