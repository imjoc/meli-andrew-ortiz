import React, { Component } from "react";

if (process.env.WEBPACK) require("./searchbox.scss");

class SearchBox extends Component {

	submit () {
		const value = document.querySelector("#search-box").value;
		this.props.submit(value);
	}

	render () {

		return (
			<form className="box-search" onSubmit={(event) => {
				event.preventDefault();
				this.submit();
			}}>
				<input
					type="text"
					name="search"
					maxLength={100}
					placeholder="Nunca dejes de buscar"
					id="search-box"
					defaultValue={this.props.value}
				/>

				<button type="submit">
					<i className="icon-search"><span>Buscar</span></i>
				</button>
			</form>
		);
	}
}

export default SearchBox;