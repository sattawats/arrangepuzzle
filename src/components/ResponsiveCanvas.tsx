import React from 'react';

interface IResponsiveCanvasProps {
	canvasId: string
	renderWidth: number
	renderHeight: number
	maxWidth?: number
	scale?: number
}

interface IResponsiveCanvasState {
	windowWidth: number
}

export default class ResponsiveCanvas extends React.Component<IResponsiveCanvasProps, IResponsiveCanvasState> {

	private containerRef: React.RefObject<HTMLDivElement>
	private canvasRef: React.RefObject<HTMLCanvasElement>
	private ratio: number

	constructor(props: IResponsiveCanvasProps) {
		super(props)

		this.containerRef = React.createRef<HTMLDivElement>();
		this.canvasRef = React.createRef<HTMLCanvasElement>();

		this.ratio = props.renderHeight / props.renderWidth;

		this.state = {
			windowWidth: window.innerWidth
		}
	}

	componentDidMount() {
		window.onresize = () => {
			if (this.state.windowWidth === window.innerWidth) {
				return // same width, don't resize canvas
			}
			this.setState({
				windowWidth: window.innerWidth
			})
		}
		this.setState({
			windowWidth: window.innerWidth
		})
	}

	render() {
		const { canvasId, renderWidth, renderHeight } = this.props

		this.ratio = renderHeight / renderWidth;
		
		const width = this.getWidth();
		const height = this.getHeight(width);
		// console.log(`r ${this.ratio}, ${width}, ${height}`)
		const style = {
			width: `${Math.round(width)}px`,
			height: `${Math.round(height)}px`
		}

		return (
			<div ref={this.containerRef} className='text-center' >
				<canvas id={canvasId}
					ref={this.canvasRef}
					width={renderWidth}
					height={renderHeight}
					style={style} >
				</canvas>
			</div>
		);
	}

	private getWidth() {
		const scale = this.props.scale ?? 1.0;
		const container = this.containerRef.current;
		if (container === null) {
			const { windowWidth } = this.state
			return windowWidth * scale;
		}
		const { maxWidth } = this.props
		if (maxWidth) {
			return Math.min(container.clientWidth, maxWidth) * scale;
		}
		return container.clientWidth
	}

	private getHeight(width: number) {
		return this.ratio * width;
	}

}
