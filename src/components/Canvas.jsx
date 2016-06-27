import React, { Component } from 'react';

class Vector2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	static dot(vec, s) {
		return new Vector2(vec.x * s, vec.y * s);
	}

	static sum(vec1, vec2) {
		return new Vector2(vec1.x + vec2.x, vec1.y + vec2.y);
	}
}

class Utils {
	static computeDelta() {
		let now = Date.now();
		Utils.delta = (now - (Utils._last || now - 16))/1000;
		Utils._last = now;
	}
}

export default class Canvas extends Component {
	constructor(props) {
		super(props);
		this.draw = this.draw.bind(this);
	}

	componentDidMount() {
		setTimeout(this.draw, 1000)
	}

	componentWillUnmount() {
		window.cancelAnimationFrame(this.frameId);
	}

	draw() {
		Utils._last = 0;

		let position = new Vector2(40, 40);
		let velocity = new Vector2(3000, 400);
		const gravity = new Vector2(0, 1900);
		const weight = 1.5;

		render.call(this);

		function render() {
			Utils.computeDelta();

			velocity = Vector2.sum(velocity, Vector2.dot(gravity, Utils.delta));
			position = Vector2.sum(position, Vector2.dot(velocity, Utils.delta));

			this.frameId = window.requestAnimationFrame(render.bind(this));
			this.ctx.clearRect(0, 0, 1200, 700);
			this.ctx.beginPath();
			this.ctx.arc(position.x, position.y, 40, 0, 2 * Math.PI);
			this.ctx.fillStyle = '#23B7A3';
			this.ctx.fill();

			if (position.y >= 660) {
				position.y = 660;
				velocity.y = -velocity.y/weight;
				velocity.x = velocity.x/weight;
			}

			if (position.y <= 40) {
				position.y = 40;
				velocity.y = -velocity.y/weight;
			}

			if (position.x >= 1160) {
				position.x = 1160;
				velocity.x = -velocity.x/weight;	
			}

			if (position.x <= 40) {
				position.x = 40;
				velocity.x = -velocity.x/weight;	
			}
		}
	}

	render() {
		return (
			<div>
				<canvas 
					width="1200"
					height="700"
					ref={(c) => {
						if (!this.ctx)
							this.ctx = c.getContext('2d');
					}}>
				</canvas>		
			</div>
		);
	}
}
