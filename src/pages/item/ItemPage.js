import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Actions
import * as ItemPageAction from "./ItemPageAction";
import * as LayoutAction from "../layout/LayoutAction";
import * as SearchPageAction from "../search/SearchPageAction";

//Components & Layout
import Layout from "../layout/Layout";
import Breadcrumb from "../../components/breadcrumb";

if (process.env.WEBPACK) require("./item.scss");

class ItemPage extends Component {

	componentWillMount () {
		const itemId = this.props.match.params.id || null;
		if (itemId) {
			this.props.itemAction.getItem(itemId);
		}
	}

	render () {
		const {loading, data} = this.props;
		const {item, categories} = data;
		let html = "";

		if (!loading) {
			html = (
				<div>
					<Breadcrumb data={categories} baseLink={this.props.searchAction.searchItems} />

					<article className="item">
						<header className="item-header-grid">
							<div className="item-pictures">
								<img src={item.picture}
								     className="item-picture"
								     height={600}
								     width={680}/>
							</div>

							<div className="item-information">
								<p className="item-state">Nuevo 200 vendidos</p>
								<h1 className="item-title">{item.title}</h1>
								<p className="item-price">{item.price.currency} {item.price.amount}</p>
								<button type="button" className="item-btn-checkout">Comprar</button>
							</div>
						</header>

						<section className="item-container-grid">
							<div className="item-description-container">
								<h2 className="item-description-title">Descripcion del producto</h2>
								<div className="item-description">
									<p dangerouslySetInnerHTML={{__html: item.description}}/>
								</div>
							</div>

							<div className="item-sidebar"/>
						</section>
					</article>
				</div>
			);
		}



		return (
			<Layout
				description="product description"
				title={(item) ? item.title : "Cargando"} history={this.props.history}
				currentUrl={`${this.props.location.pathname}${this.props.location.search}`}
			>
				{html}
			</Layout>
		);
	}
}

const mapStateToProps = state => ({
	data: state.itemPage.data,
	loading: state.itemPage.loading
});

const mapDispatchToProps = (dispatch) => {
	return {
		itemAction: bindActionCreators(ItemPageAction, dispatch),
		searchAction: bindActionCreators(SearchPageAction, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);
