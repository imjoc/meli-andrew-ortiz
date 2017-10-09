import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Actions
import * as SearchPageAction from "./SearchPageAction";
import * as ItemPageAction from "../item/ItemPageAction";

//Layout & Components
import Layout from "../layout/Layout";
import Breadcrumb from "../../components/breadcrumb";
import NotResults from "../../components/notresults";

if (process.env.WEBPACK) require("./search.scss");

class SearchPage extends Component {

	constructor (props) {
		super(props);
	}

	componentWillMount () {
		const search = this.checkParamSearch();
		if (search) {
			this.props.searchAction.searchItems(search);
		} else {
			this.props.searchAction.cleanSearch(false);
		}
	}

	componentWillUnmount () {
		this.props.searchAction.cleanSearch();
	}

	/**
	 * @description Validate if exist param search.
	 * @return {Boolean}
	 */
	checkParamSearch () {
		const param = this.props.location.search;
		return (param.indexOf("search") > 0 && param.indexOf("=") > 0) ? param.split("=")[1] : false;
	}

	render () {
		const {items, categories} = this.props.results;
		let html = (
			<div className="search-container">
				<Breadcrumb data={categories} baseLink={this.props.searchAction.searchItems}/>

				<section className="search-result">
					{items.map((row, index) => {
						const picture = row.picture.replace("I.jpg", "N.jpg");
						return (
							<article className="result-item" key={index} onClick={() => {
								this.props.itemPage.getItem(row.id);
							}}>

								<img
									src={picture}
									width={180}
									href={180}
								/>


								<section className="item-description">
									<p>
										{row.price.currency} {row.price.amount}
										<i className={row.free_shipping ? "icon-shipping" : ""}><span>Buscar</span></i>
									</p>

									<h5>{row.title}</h5>
								</section>

								<section className="item-address">
									<p>{row.address.state_name}</p>
								</section>
							</article>
						);
					})}
				</section>
			</div>
		);

		if (this.props.loading) {
			html = "";
		} else if (this.checkParamSearch() <= 0 || items.length <= 0) {
			html = (<NotResults/>);
		}

		const metaDescription = `Encontrá ${this.props.search_value} en Mercado Libre Argentina. Descubrí la mejor forma de comprar online.`;
		return (
			<Layout
				description={metaDescription}
				title={`Buscando ${this.props.search_value}`}
				history={this.props.history}
				currentUrl={`${this.props.location.pathname}${this.props.location.search}`}
			>
				{html}
			</Layout>
		);
	}
}

const mapStateToProps = state => ({
	results: state.searchPage.results,
	loading: state.searchPage.loading,
	search_value: state.searchPage.search_value
});

const mapDispatchToProps = (dispatch) => {
	return {
		searchAction: bindActionCreators(SearchPageAction, dispatch),
		itemPage: bindActionCreators(ItemPageAction, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);