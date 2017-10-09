import { push } from "react-router-redux";
import axios from "axios";

import * as SearchDuck from "../../ducks/SearchDuck";

/***
 * @description Gets items by word value and dispatch state.
 * @param {String} value
 */
export const searchItems = (value) =>
	(dispatch) => {
		value = encodeURIComponent(value);
		dispatch(setSearchValue(value));
		dispatch(cleanSearch(true));
		dispatch(changeLocation(value));

		axios.get(`/api/items/?q=${value}`)
			.then(function (response) {
				if (response.data.error === "not_found") {
					dispatch(SearchDuck.clearState(false));
				} else {
					dispatch(SearchDuck.searchItems(response.data));
				}
			}).catch(function () {
			dispatch(SearchDuck.clearState(false));
		});
	};

/***
 * @description Clear state to reset loading.
 * @param {Boolean} loading
 */
export const cleanSearch = (loading) => (dispatch) => {
	dispatch(SearchDuck.clearState(loading));
};

/***
 * @description Set search value.
 * @param {String} value
 */
export const setSearchValue = (value) => (dispatch) => {
	dispatch(SearchDuck.setSearchValue(value));
};

/***
 * @description Push view.
 * @param {String} value
 */
export const changeLocation = (value) => (dispatch) => {
	dispatch(push(`/items?search=${value}`));
};