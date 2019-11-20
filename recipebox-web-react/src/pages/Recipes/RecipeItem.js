import React from "react";

function RecipeItem(props) {
	let recipe = props.recipe;
	return (
		<div className="row p-2 border-bottom">
			<div className="col">
				<div className="row">
					<div className="col font-weight-bold">{recipe.name}</div>
				</div>
				<div className="row">
					<div className="col font-italic">{recipe.description ? recipe.description : ' - '}</div>
				</div>
			</div>
		</div>
	);
}

export default RecipeItem;
