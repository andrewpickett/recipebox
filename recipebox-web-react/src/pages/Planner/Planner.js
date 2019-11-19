import React from "react";
import axios from "axios";
import auth from "../../auth";

class Planner extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: ''
		}
	}

	componentDidMount() {
		axios.post('/planner', {}, { headers: auth.getAuthHeader() })
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

export default Planner;
