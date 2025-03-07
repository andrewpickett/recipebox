import React from "react";
import axios from "axios";
import auth from "../../auth";
import RecipeListItem from "./RecipeListItem";
import RecipeTagList from "./RecipeTagList";

class Recipe extends React.Component {
	constructor(props) {
		super(props);
		let id = this.props.match.params.recipe_id;
		this.state = {
			recipe_id: id,
			scalar: 1,
			recipe: {}
		}

		this.moveSlider = this.moveSlider.bind(this);
		this.scaleIngredient = this.scaleIngredient.bind(this);
		this.convertIngredient = this.convertIngredient.bind(this);
	}

	componentDidMount() {
		axios.post('/recipes/' + this.state.recipe_id, {}, { headers: auth.getAuthHeader() })
			.then(response => {
				this.setState({recipe: response.data});
			});
	}

	convertIngredient(i) {
		let idx = i.slice().search(/[a-zA-Z]/);
		if (idx > 0) {
			let quantity = i.substring(0, idx).trim();
			return <div onClick={this.scaleIngredient}><span className="font-weight-bold ingredient-quantity">{quantity}</span> {i.substring(idx)}</div>;
		} else {
			return i;
		}
	}

	moveSlider(event) {
		const target = event.target;
		this.setState({
			scalar: target.value
		});
	}

	scaleIngredient(event) {
		axios.post('/recipes/' + this.state.recipe_id + '/scale', {scale: this.state.scalar}, { headers: auth.getAuthHeader() })
			.then(response => {
				this.setState({recipe: response.data});
			});
	}

	render() {
		let ingredients = this.state.recipe.ingredient_list ? this.state.recipe.ingredient_list.map((d) => <li key={d}>{this.convertIngredient(d)}</li>) : null;
		let instructions = this.state.recipe.instruction_list ? this.state.recipe.instruction_list.map((d) => <li key={d}>{d}</li>) : null;
		let notes = null;
		return (
			<div className="container rounded border">
				<div className="row bg-secondary rounded-top">
					<div className="col-sm text-left my-auto p-2 font-weight-bold text-white">
					</div>
					<div className="col-sm text-right my-auto p-2">
					</div>
				</div>
				<div className="row">
					<div className="col-sm-auto py-2">
						<img src={this.state.recipe.image_url} className="rounded border" height="150" alt="" />
					</div>
					<div className="col">
						<div className="row">
							<div className="col display-3 font-italic pb-4">
								{this.state.recipe.name}
							</div>
						</div>
						<div className="row">
							<RecipeTagList tags={this.state.recipe.tags ? this.state.recipe.tags : []} />
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<h4>Ingredients</h4>
						<ul>
							{ingredients}
						</ul>
					</div>
					<div className="col">
						<label htmlFor="customRange3">Scale Recipe: x{this.state.scalar}</label>
						<input type="range" className="custom-range" min="0.125" max="8" step="0.125" id="customRange3" onChange={this.moveSlider} onMouseUp={this.scaleIngredient} value={this.state.scalar} />
					</div>
					<div className="col-6">
					</div>
				</div>
				<div className="row">
					<div className="col">
						<h4>Instructions</h4>
						<ol>
							{instructions}
						</ol>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<h4>Notes</h4>
						<ul className="list-unstyled">
							{notes}
						</ul>
					</div>
				</div>
				<div className="row bg-secondary rounded-bottom p-2">
				</div>
			</div>
		);
	}
}

export default Recipe;
