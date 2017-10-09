import "babel-polyfill";
import React from "react";
import { Helmet } from "react-helmet";
import thunk from "redux-thunk";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import App from "./App";
import reducers from "./reducers";


const middleware = [thunk];
const store = createStore(reducers, applyMiddleware(...middleware));

const title = "Mercado Libre";

export default (req, res) => {
	if (process.env.NODE_ENV === "development") {
		res.send(`
			<!doctype html>
			<html>
				<head>
					<title>${title}</title>
				</head>
				<body>
					<div id="app"></div>
					<script src="/bundle.js"></script>
				</body>
			</html>
		`);
	} else if (process.env.NODE_ENV === "production") {
		const render = renderToString(
			<Provider store={store}>
				<StaticRouter location={req.url} context={{}}>
					<App/>
				</StaticRouter>
			</Provider>
		);
		const helmet = Helmet.renderStatic();

		res.send(`
			<!doctype html>
			<html ${helmet.htmlAttributes.toString()}>
				<head>
		            ${helmet.title.toString()}
		            ${helmet.meta.toString()}
		            ${helmet.link.toString()}
					<link rel="stylesheet" href="/bundle.css">
				</head>
				<body ${helmet.bodyAttributes.toString()}>
					<div id="app">${render}</div>
					<script src="/bundle.js"></script>
				</body>
			</html>
		`);
	}
};
