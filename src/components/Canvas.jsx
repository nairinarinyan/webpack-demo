import React, { Component } from 'react';

class Scene {
	static get WIDTH () {
		return 1200;
	}

	static get HEIGHT () {
		return 700;
	}
}

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

	static get GRAVITY() {
		return new Vector2(0, 1900);
	}

	static detectCollisions(objects) {
		objects.forEach(obj => {
			if (obj.position.y >= Scene.HEIGHT - obj.radius) {
				obj.position.y = Scene.HEIGHT - obj.radius
				obj.velocity.y = -obj.velocity.y/obj.weight;
				obj.velocity.x = obj.velocity.x/obj.weight;
			}

			if (obj.position.y <= obj.radius) {
				obj.position.y = obj.radius;
				obj.velocity.y = -obj.velocity.y/obj.weight;
			}

			if (obj.position.x >= Scene.WIDTH - obj.radius) {
				obj.position.x = Scene.WIDTH - obj.radius;
				obj.velocity.x = -obj.velocity.x/obj.weight;	
			}

			if (obj.position.x <= obj.radius) {
				obj.position.x = obj.radius;
				obj.velocity.x = -obj.velocity.x/obj.weight;	
			}
		});
	}

	static computeNextPositions(objects) {
		objects.forEach(obj => {
			obj.velocity = Vector2.sum(obj.velocity, Vector2.dot(Utils.GRAVITY, Utils.delta));
			obj.position = Vector2.sum(obj.position, Vector2.dot(obj.velocity, Utils.delta));
		});
	}
}

class Ball {
	constructor(positionX, positionY, radius, velocityX, velocityY, color, weight = 1.5) {
		this.position = new Vector2(positionX, positionY);
		this.velocity = new Vector2(velocityX, velocityY);
		this.radius = radius;
		this.weight = weight;
		this.color = color;
	}

	canvasArc() {
		return [this.position.x, this.position.y, this.radius, 0, 2 * Math.PI];
	}

	static drawBalls(ctx, balls) {
		balls.forEach(ball => {
			ctx.beginPath();
			ctx.arc(...ball.canvasArc());
			ctx.fillStyle = ball.color;
			ctx.fill();
		});
	}
}

class Line {
	static connectBalls(ctx, lineColor, balls) {
		ctx.beginPath();
		ctx.strokeStyle = lineColor;
		ctx.moveTo(balls[0].position.x, balls[0].position.y);

		balls.slice(1).forEach(ball => {
			ctx.lineTo(ball.position.x, ball.position.y);
		});

		ctx.closePath();
		ctx.stroke();
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

		let balls = [
			new Ball(40, 40, 40, 3000, 400, '#23B7A3'),
			new Ball(40, 40, 40, 1000, 800, '#09814A'),
			new Ball(40, 660, 40, 2000, -1300, '#EE964B'),
			new Ball(40, 60, 80, 200, 1300, '#22AED1'),
			new Ball(140, 300, 10, 2000, -1300, '#5603AD'),
			new Ball(660, 100, 53, 3000, -120, '#6E0D25'),
			new Ball(40, 60, 40, 200, -1300, '#472C1B'),
			new Ball(900, 260, 40, 1100, 1300, '#FF5D73')
		];

		render.call(this);

		function render() {
			Utils.computeDelta();
			Utils.computeNextPositions(balls);

			this.frameId = window.requestAnimationFrame(render.bind(this));
			this.ctx.clearRect(0, 0, 1200, 700);

			Line.connectBalls(this.ctx, '#19647E', balls);
			Ball.drawBalls(this.ctx, balls);
			Utils.detectCollisions(balls);
		}
	}

	render() {
		return (
			<div>
				<canvas 
					width={Scene.WIDTH}
					height={Scene.HEIGHT}
					ref={(c) => {
						if (!this.ctx)
							this.ctx = c.getContext('2d');
					}}>
				</canvas>		
			</div>
		);
	}
}
