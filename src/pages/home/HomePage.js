import React, { Component } from "react";
import { connect } from "react-redux";


//Layout
import Layout from "../layout/Layout";

class Home extends Component {
	render () {
		return (
			<Layout history={this.props.history}> </Layout>
		);
	}
}

export default connect((state) => {
	return state;
})(Home);