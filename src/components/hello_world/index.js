import React, { Component } from 'react'

// Needed components here

export default class HelloWorld extends Component {

	constructor ( props, context ) {

		super( props )

		this.state = {}

	}

	render() {
		return (
			<div>
				<h1>Hello World with ReactJS</h1>
			</div>
		);
	}
}

HelloWorld.contextTypes = {
    router: React.PropTypes.object.isRequired
}
