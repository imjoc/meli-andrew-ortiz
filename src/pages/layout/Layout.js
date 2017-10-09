import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { push } from "react-router-redux";

//Action Pages
import * as LayoutAction from "./LayoutAction";
import * as SearchPageAction from "../search/SearchPageAction";

//Components
import SearchBox from "../../components/searchbox/SearchBox";

if (process.env.WEBPACK) require("./layout.scss");

class Layout extends Component {

	constructor (props) {
		super(props);
	}

	render () {
		const title = (this.props.title) ? `${this.props.title} - Mercado Libre` : "Mercado Libre";
		return (
			<div className="layout">

				<Helmet>
					<meta charSet="utf-8"/>
					<link rel='canonical' href={`${this.props.currentUrl}`}/>
					<meta name='description' content={this.props.description}/>
					<link rel="shortcut icon" href="../../assets/images/favicon.ico"/>
					<title>{title}</title>
				</Helmet>

				<header className="header">
					<div className="nav-header">
						<a className="header-logo" onClick={this.props.layoutAction.goHome}/>
						<div className="header-box-search">
							<SearchBox submit={this.props.searchAction.searchItems} value={this.search_value}/>
						</div>
					</div>
				</header>

				<main className="container loader">{this.props.children}</main>

				<footer className="footer">

				</footer>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		search_value: state.searchPage.search_value
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		searchAction: bindActionCreators(SearchPageAction, dispatch),
		layoutAction: bindActionCreators(LayoutAction, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
