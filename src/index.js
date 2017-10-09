import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { createBrowserHistory } from "history";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import App from "./App";
import reducers from "./reducers";

const logger = createLogger();

const history = createBrowserHistory();
const middleware = [thunk, routerMiddleware(history), logger];

const initialState = {};

const store = createStore(reducers, initialState, compose(
	applyMiddleware(...middleware)
));

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App/>
		</ConnectedRouter>
	</Provider>
	, document.getElementById("app"));

if (process.env.NODE_ENV === "development" && module.hot) {
	module.hot.accept();
	module.hot.accept("./reducers", () => {
		store.replaceReducer(require("./reducers").default);
	});
}
