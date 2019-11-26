import React from "react";
import axios from 'axios';
import auth from "../../auth";
import Loader from "../../layout/Loader";
import RecipeListItem from "./RecipeListItem";

class Recipes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recipes: <Loader />
		}
	}

	componentDidMount() {
		axios.post('/recipes', {}, { headers: auth.getAuthHeader() })
			.then(response => {
				const listItems = response.data.map((d) => <RecipeListItem key={d.id} recipe={d} />);
				if (listItems && listItems.length > 0) {
					this.setState({recipes: listItems});
				} else {
					this.setState({recipes: <div>You have no recipes yet!</div>})
				}
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
						<a className="btn btn-primary btn-sm" href="/recipes/create" role="button">+ New</a>
					</div>
				</div>
				{ this.state.recipes }
				<div className="row bg-secondary rounded-bottom p-2">
				</div>
			</div>
		);
	}
}

export default Recipes;
