import React from "react";
import axios from 'axios';
import auth from "../../auth";

class Recipes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: ''
		}
	}

	componentDidMount() {
		axios.post('/recipes', {}, { headers: auth.getAuthHeader() })
			.then(response => {
				this.setState({content: response.data});
		});
	}

	render() {
		return (
			<div>
				{this.state.content}
			</div>
		);
	}
}

export default Recipes;
