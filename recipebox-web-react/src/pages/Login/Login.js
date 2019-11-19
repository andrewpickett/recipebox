import React from "react";
import auth from "../../auth";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		// TODO: Fix this
		auth.login({name: 'Andrew', password: 'darkstar'}, '/recipes');
	}

	render() {
		return (
			<div className="row">
				<div className="mx-auto">
					<form className="form-signin" onSubmit={this.handleSubmit}>
						<div className="form-group row">
							<input type="text" className="form-control form-control-lg" placeholder="Name" required="required" autoFocus="autofocus" autoComplete="off" />
							<input type="password" className="form-control form-control-lg" placeholder="Password" required="required" />
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
