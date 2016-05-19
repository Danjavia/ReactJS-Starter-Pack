import React, { Component } from 'react'

// Needed components here

export default class App extends Component {

	constructor ( props, context ) {

		super( props )

		this.state = {}

	}

	render() {
		return (
			<div>
				{ this.props.children }
			</div>
		);
	}
}

App.contextTypes = {
    router: React.PropTypes.object.isRequired
}
