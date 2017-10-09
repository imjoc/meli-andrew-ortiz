import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import SearchDuck from "./ducks/SearchDuck";
import ItemDuck from "./ducks/ItemDuck";

export default combineReducers ({
	searchPage: SearchDuck,
	itemPage: ItemDuck,
	routing: routerReducer
});
