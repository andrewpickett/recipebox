import React from "react";

function Loader() {
	return (
		<div className="row text-center py-3 border-bottom">
			<div className="spinner-border text-success mx-auto" role="status">
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
}

export default Loader;
