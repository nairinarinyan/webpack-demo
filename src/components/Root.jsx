import React, { Component } from 'react';
import { Link } from 'react-router';

class Button extends Component {
	render() {
		return (
			<button className='btn btn-default'>
				<Link {...this.props}>
					{this.props.to.replace(/\//, '')} page
				</Link>
			</button>
		);
	}
}

export default class Root extends Component {
	render() {
		return (
			<div>
				<Button to='/boring' />
				<Button to='/heavy' />

				{this.props.children}
			</div>
		);
	}
}