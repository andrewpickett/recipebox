import React from "react";
import auth from "../../auth";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {name: '', password: ''};

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
		auth.login(this.state, '/recipes');
	}

	render() {
		return (
			<div className="row">
				<div className="mx-auto">
					<form className="form-signin" onSubmit={this.handleSubmit}>
						<div className="form-group row">
							<input type="text" name="name" className="form-control form-control-lg" placeholder="Email" required="required" autoFocus="autofocus" autoComplete="off" onChange={this.handleChange} value={this.state.name} />
							<input type="password" name="password" className="form-control form-control-lg" placeholder="Password" required="required" onChange={this.handleChange} value={this.state.password} />
						</div>

						<div className="form-group row">
							<button type="submit" className="btn btn-lg btn-primary btn-block">Sign in</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
