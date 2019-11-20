import React from "react";

function RecipeTagList(props) {
	const tagItems = props.tags.map((item, index) => <span className="small rounded-pill border-info text-info mr-3" key={index}>{item}</span>);

	return (
		<div className="col">
			{ tagItems }
		</div>
	);
}

export default RecipeTagList;
