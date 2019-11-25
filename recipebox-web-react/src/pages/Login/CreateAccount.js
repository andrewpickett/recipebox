import React from "react";
import axios from "axios";
import config from "../../config";
import auth from "../../auth";

class CreateAccount extends React.Component {
	constructor(props) {
		super(props);
		this.state = {name: '', email: '', password: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const target = event.target;

		this.setState({
			[target.name]: target.value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		let formData = this.state;
		axios.post('/account/create', formData, config.AXIOS_CONFIG)
			.then(response => {
				auth.login(formData, '/recipes');
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		return (
			<div className="mx-auto col-7">
				<form method="POST" onSubmit={this.handleSubmit}>
					<div className="form-group row">
						<label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
						<div className="col-sm-9">
							<input type="text" className="form-control" id="name" name="name" autoFocus="autoFocus" autoComplete="off" required="required" onChange={this.handleChange} value={this.state.name} />
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="email" className="col-sm-3 col-form-label">Email address</label>
						<div className="col-sm-9">
							<input type="email" className="form-control" id="email" name="email" autoComplete="off" required="required" onChange={this.handleChange} value={this.state.email} />
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
						<div className="col-sm-9">
							<input type="password" className="form-control" id="password" name="password" autoComplete="off" required="required" onChange={this.handleChange} value={this.state.password} />
						</div>
					</div>
					<button type="submit" className="btn btn-primary btn-block mx-auto col-4">Create Account</button>
				</form>
			</div>
		);
	}
}

export default CreateAccount;
