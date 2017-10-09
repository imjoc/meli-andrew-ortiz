import React, { Component } from "react";

if (process.env.WEBPACK) require("./breadcrumb.scss");

class Breadcrumb extends Component {

	render () {
		const data = this.props.data || [];

		return (<div className="container-breadcrumb">
			<ul className="breadcrumb">
				{data.map((row, index) => {
					return (
						<li key={index} onClick={() => {
							this.props.baseLink(row);
						}}>{row}</li>
					);
				})}
			</ul>
		</div>);
	}
}

export default Breadcrumb;