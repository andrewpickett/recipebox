import React from "react";
import axios from "axios";
import auth from "../../auth";
import RecipeListItem from "./RecipeListItem";

class Recipe extends React.Component {
	constructor(props) {
		super(props);
		let id = this.props.match.params.recipe_id;
		this.state = {
			recipe_id: id,
			recipe: {}
		}
	}

	componentDidMount() {
		axios.post('/recipes/' + this.state.recipe_id, {}, { headers: auth.getAuthHeader() })
			.then(response => {
				this.setState({recipe: response.data});
			});
	}

	render() {
		let ingredients = this.state.recipe.ingredient_list ? this.state.recipe.ingredient_list.map((d) => <li key={d.id}>{d}</li>) : null;
		return (
			<div className="container rounded border">
				<div className="row bg-secondary rounded-top">
					<div className="col-sm text-left my-auto p-2 font-weight-bold text-white">
						{this.state.recipe.name}
					</div>
					<div className="col-sm text-right my-auto p-2">
					</div>
				</div>
				<ul>
					{ingredients}
				</ul>
				<div className="row bg-secondary rounded-bottom p-2">
				</div>
			</div>
		);
	}
}

export default Recipe;
