import React, { Component } from 'react';
import Canvas from './Canvas';

export default class Boring extends Component {
	constructor(props) {
		super(props);
		this.state = { counter: 0 };
		this.increment = this.increment.bind(this);
	}

	componentDidMount() {
		this.frameId = setInterval(this.increment, 1000);
		// this.increment();
	}

	increment() {
		this.setState(({ counter }) => ({
			counter: counter + 10
		}));
	}

	componentWillUnmount() {
		// window.cancelAnimationFrame(this.frameId);
		clearInterval(this.frameId);
	}

	render() {
		return (
			<div>
				<h2>I'm Boring</h2>
				<h3>But I can count, see:</h3>
				<h3>{this.state.counter}</h3>
				
				<Canvas />
			</div>	
		);
	}
}