import * as React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

interface IAlertModalProps {
	body: JSX.Element;
	header: string;
	leftButton: string;
	rightButton?: string;
}

interface IAlertModelState {
	isOpen: boolean;
	resolveAlert: any;
}

export default class AlertModal extends React.Component<IAlertModalProps, IAlertModelState> {

	constructor(props: IAlertModalProps) {
		super(props);
		this.state = {
			isOpen: false,
			resolveAlert: undefined,
		};
	}

	public openClose(open: boolean) {
		this.setState({
			isOpen: open,
		});
	}

	public show = () => {
		this.toggleModal();

		return new Promise((resolve, reject) => {
			this.setState({
				resolveAlert: resolve,
			});
		});
	}

	public render() {
		const { header, body, leftButton, rightButton } = this.props;
		const { isOpen } = this.state;
		return (
			<Modal isOpen={isOpen} toggle={this.toggleModal}>
				<ModalHeader toggle={this.toggleModal}>{header}</ModalHeader>
				<ModalBody>{body}</ModalBody>
				<ModalFooter>
					<Button color='primary' onClick={this.onContinue}>{leftButton}</Button>{' '}
					{ rightButton !== undefined ? 
						<Button color='secondary' onClick={this.onCancel}>{rightButton}</Button> : undefined }
				</ModalFooter>
			</Modal>
		);
	}

	private toggleModal = () => {
		const { isOpen } = this.state;
		this.notifyAnswer(false);
		this.openClose(!isOpen);
	}

	private onContinue = () => {
		this.notifyAnswer(true);
		this.openClose(false);
	}

	private onCancel = () => {
		this.notifyAnswer(false);
		this.openClose(false);
	}

	private notifyAnswer(isLeftButton: boolean) {
		const { isOpen, resolveAlert } = this.state;
		if (isOpen) {
			if (resolveAlert !== undefined) {
				resolveAlert(isLeftButton);
			}
		}
	}
}
