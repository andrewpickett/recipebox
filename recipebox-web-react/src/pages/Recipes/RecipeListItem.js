import React from "react";
import RecipeTagList from "./RecipeTagList";
import './RecipeListItem.css';

function RecipeListItem(props) {
	let recipe = props.recipe;
	let recipe_url = '/recipes/' + recipe.id;
	return (
		<div className="row p-2 border-bottom recipe-item">
			<div className="col-sm-auto">
				<img src={recipe.image_url} className="rounded-circle" height="48" alt="" />
			</div>
			<div className="col">
				<div className="row">
					<div className="col font-weight-bold">
						<a href={recipe_url}>{recipe.name}</a>
					</div>
				</div>
				<div className="row">
					<RecipeTagList tags={recipe.tags ? recipe.tags : []} />
				</div>
			</div>
		</div>
	);
}

export default RecipeListItem;
