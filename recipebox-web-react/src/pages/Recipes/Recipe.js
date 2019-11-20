import React from "react";

class Recipe extends React.Component {
	constructor(props) {
		super(props);
		let id = this.props.match.params.recipe_id;
		this.state = {
			recipe_id: id
		}
		console.log(props)
	}

	componentDidMount() {
	}

	render() {
		return (
			<div className="container rounded">
				<div className="row bg-secondary rounded-top">
					<div className="col-sm text-left my-auto p-2 font-weight-bold text-white">
						Recipe {this.state.recipe_id}
					</div>
					<div className="col-sm text-right my-auto p-2">
						&nbsp;
					</div>
				</div>
				<div className="row bg-secondary rounded-bottom p-2">
				</div>
			</div>
		);
	}
}

export default Recipe;
