import React from "react";
import RecipeTagList from "./RecipeTagList";

function RecipeListItem(props) {
	let recipe = props.recipe;
	return (
		<div className="row p-2 border-bottom">
			<div className="col-sm-auto">
				<img src={recipe.image_url} className="rounded-circle" height="48" alt="" />
			</div>
			<div className="col">
				<div className="row">
					<div className="col font-weight-bold">{recipe.name}</div>
				</div>
				<div className="row">
					<RecipeTagList tags={recipe.tags ? recipe.tags : []} />
				</div>
			</div>
		</div>
	);
}

export default RecipeListItem;
