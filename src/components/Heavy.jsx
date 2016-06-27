import React, { Component } from 'react';


export default class Heavy extends Component {
	componentDidMount() {
		require.ensure(['lodash'], (require) => {
			let _ = require('lodash');
			console.log(_.pick(navigator, ['userAgent']));
		});
	}

	render() {
		return (
			<div>
				<h2>Heavy</h2>
			</div>	
		);
	}
}