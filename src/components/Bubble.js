import React from 'react';

class Bubble extends React.Component {
	state = {
		bubbles: 20,
		score: 0,
		time: 10,
		started: false
	};

	componentDidUpdate() {
		if (this.state.score === 0 && this.state.time === 10) {
			this.createBubble();
			this.getPosition();
			this.getColor();
			this.startGame();
		}
	}

	getColor = () => {
		const bubbles = document.querySelectorAll('.bubble');
		const colors = [
			'#4d089a',
			'#323edd',
			'#dc2ade',
			'#e8f044',
			'#ff502f',
			'#5bd1d7',
			'#c81912',
			'#21bf73',
			'#0c9463',
			'#ffd800'
		];

		for (let bubble of bubbles) {
			const c = Math.floor(Math.random() * 10);
			Object.assign(bubble.style, {
				backgroundColor: colors[c]
			});
		}
	};

	getPosition = () => {
		const bubbles = document.querySelectorAll('.bubble');

		for (let bubble of bubbles) {
			Object.assign(bubble.style, {
				animationDuration: Math.floor(Math.random() * 8) + 5 + 's',
				left: Math.floor(Math.random() * 90) + '%'
			});
		}
	};

	clickBubble = (e) => {
		const bubble = e.target;
		this.setState((prevState) => {
			return { score: prevState.score + 1 };
		});
		bubble.classList.remove('move');
		bubble.classList.add('clicked');
		bubble.addEventListener('animationend', () => {
			bubble.style.display = 'none';
		});
	};

	createBubble = () => {
		let bubbleList = [];
		for (let i = 0; i <= this.state.bubbles; i++) {
			bubbleList.push(<div key={i} className="bubble" onClick={this.clickBubble} />);
		}
		return bubbleList;
	};

	startGame = () => {
		const bubbles = document.querySelectorAll('.bubble');
		for (let bubble of bubbles) {
			bubble.classList.add('move');
		}
	};

	render() {
		return (
			<div className="wrapper">
				<h1>Score: {this.state.score}</h1>
				<h2>{this.state.time}</h2>

				{this.state.started ? (
					this.createBubble()
				) : (
					<button
						onClick={() => {
							this.setState({
								started: true,
								score: 0,
								time: 10
							});

							if (this.state.time) {
								setInterval(() => {
									if (this.state.time > 0)
										this.setState((prevState) => {
											return { time: prevState.time - 1 };
										});
									if (this.state.time === 0) {
										this.setState({ started: false });
									}
								}, 1000);
							}
						}}
					>
						Start
					</button>
				)}
			</div>
		);
	}
}

export default Bubble;
