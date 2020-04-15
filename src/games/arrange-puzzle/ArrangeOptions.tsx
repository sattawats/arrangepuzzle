import React from 'react';
import { Col, Container, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AlertModal from '../../components/AlertModal';

interface IArrangeOptionsProps {
	onSizeChanged: (size: number) => void
}

interface IArrangeOptionsState {
	boardSize: number
}

class ArrangeOptions extends React.Component<IArrangeOptionsProps, IArrangeOptionsState> {

	private alertIntro: React.RefObject<AlertModal>;

	constructor(props: any) {
		super(props)

		this.state = {
			boardSize: 4,
		};
		this.alertIntro = React.createRef<AlertModal>();
	}

	public async show() {
		const alertIntro = this.alertIntro.current;
		if (alertIntro) {
			await alertIntro.show();
		}
	}

	renderAlertBody() {
		const { boardSize } = this.state;
		return (
			<Container fluid className='text-center text-small'>
				<Row><Col><b>Arrange Puzzle</b></Col></Row>

				<Form className='mt-3'>
					<FormGroup row>
						<Label for="boardSizeSelect">Select board size:</Label>
						<Input type="select" name="select" id="boardSizeSelect" onChange={this.sizeDropdownChanged} defaultValue={boardSize}>
							<option value={3}>3x3</option>
							<option value={4}>4x4</option>
							<option value={5}>5x5</option>
							<option value={6}>6x6</option>
						</Input>
					</FormGroup>
				</Form>
			</Container>
		);
	}

	render() {
		return (
			<div>
				<Button className='' size='sm' color='primary' onClick={this.onOptions}>Options</Button>
				<AlertModal
					ref={this.alertIntro}
					header="Options"
					body={this.renderAlertBody()}
					leftButton="Close" />
			</div>

		);
	}

	sizeDropdownChanged = (e: any) => {
		const s = e.target.value;
		this.setState({
			boardSize: s,
		});
		this.props.onSizeChanged(s);
	}

	private onOptions = async () => {
		await this.show();
	}

}

export default ArrangeOptions;
