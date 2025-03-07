import React from "react";

function RecipeTagList(props) {
	const tagItems = !props.tags ? '' : props.tags.map((item, index) => <div key={index} className="small px-2 border rounded-pill border-info text-info mr-3 float-left">{item}</div>);

	return (
		<div className="col">
			{ tagItems }
		</div>
	);
}

export default RecipeTagList;
