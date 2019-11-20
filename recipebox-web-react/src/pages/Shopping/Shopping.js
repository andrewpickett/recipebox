import React from "react";
import axios from "axios";
import auth from "../../auth";
import Loader from "../../layout/Loader";

class Shopping extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: <Loader />
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
			<div className="container rounded border">
				<div className="row bg-secondary rounded-top">
					<div className="col-sm text-left my-auto p-2 font-weight-bold text-white">
						&nbsp;
					</div>
					<div className="col-sm text-right my-auto p-2">
						&nbsp;
					</div>
				</div>
				{ this.state.content }
				<div className="row bg-secondary rounded-bottom p-2">
				</div>
			</div>
		);
	}
}

export default Shopping;
