import React from 'react';
import AlertModal from './AlertModal';

interface IScorePaneProps {
	gameTitle: string;
	title: string;
	buttonTitle: string;
}

interface IScorePaneState {
	details: JSX.Element;
}

class ScorePane extends React.Component<IScorePaneProps, IScorePaneState> {

	private alertIntro: React.RefObject<AlertModal>;

	constructor(props: any) {
		super(props)
		this.state = {
			details: (<div></div>)
		};
		this.alertIntro = React.createRef<AlertModal>();
	}

	public async show(details: JSX.Element) {
		const alertIntro = this.alertIntro.current;
		if (alertIntro) {
			this.setState({
				details
			});
			await alertIntro.show();
		}
	}

	renderAlertBody() {
		const { title } = this.props;
		const { details } = this.state;
		return (
			<div className='text-center'>
				<div className='pb-5 pt-5'>
					<h4>{ title }</h4>
					<div>{details}</div>
				</div>
			</div>
		);
	}

	render() {
		const { buttonTitle } = this.props;
		return (
			<AlertModal
				ref={this.alertIntro}
				header="Win"
				body={this.renderAlertBody()}
				leftButton={buttonTitle} />
		);
	}
}

export default ScorePane;
