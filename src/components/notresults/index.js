import React, { Component } from "react";
if (process.env.WEBPACK) require("./index.scss")

class NotResults extends Component {

	render () {
		return (<div className="no-results">No se encontraron resultados.</div>);
	}
}

export default NotResults;