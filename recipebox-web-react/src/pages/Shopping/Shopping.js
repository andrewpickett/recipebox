import React from "react";
import axios from "axios";
import auth from "../../auth";

class Shopping extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: ''
		}
	}

	componentDidMount() {
		axios.post('/shopping', {}, { headers: auth.getAuthHeader() })
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

export default Shopping;
