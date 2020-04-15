import React from 'react';
import AlertModal from '../../components/AlertModal';

interface IArrangeScoreProps {
}

interface IArrangeScoreState {
	moves: number;
}

class ArrangeScore extends React.Component<IArrangeScoreProps, IArrangeScoreState> {

	private alertIntro: React.RefObject<AlertModal>;

	constructor(props: any) {
		super(props)
		this.state = {
			moves: 0
		};
		this.alertIntro = React.createRef<AlertModal>();
	}

	public async show(moves: number) {
		const alertIntro = this.alertIntro.current;
		if (alertIntro) {
			this.setState({
				moves
			});
			await alertIntro.show();
		}
	}

	renderAlertBody() {
		const { moves } = this.state;
		return (
			<div className='text-center'>
				<div className='pb-5 pt-5'>
					<h4>Yeah! You beat the arrage puzzle</h4>
					<div>Total Moves: {moves}</div>
				</div>
			</div>
		);
	}

	render() {
		return (
			<AlertModal
				ref={this.alertIntro}
				header="Win"
				body={this.renderAlertBody()}
				leftButton="Play Again" />
		);
	}
}

export default ArrangeScore;
