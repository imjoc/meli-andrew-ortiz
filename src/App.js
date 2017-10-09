import "babel-polyfill";
import React from "react";
import { Switch, Route } from "react-router-dom";

//Components
import Home from "./pages/home";
import SearchPage from "./pages/search";
import ItemPage from "./pages/item";
import NoMatch from "./components/nomatch";

export default () => (
	<Switch>
		<Route exact path='/' component={Home}/>
		<Route exact path='/items' component={SearchPage}/>
		<Route exact path='/items/:id' component={ItemPage}/>
		<Route component={NoMatch}/>
	</Switch>
);