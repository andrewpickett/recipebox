import React from "react";
import auth from "../../auth";

function Home(props) {
	if (props.logout) {
		auth.logout();
	}
	return (
		<div>
			I love recipes, yes I do!
		</div>
	);
}

export default Home;
