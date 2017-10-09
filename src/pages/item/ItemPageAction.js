import { push } from "react-router-redux";
import axios from "axios";
import * as ItemDuck from "../../ducks/ItemDuck";

/***
 * @description Gets item data by id.
 * @param {String} id
 */
export const getItem = (id) =>
	(dispatch) => {
		dispatch(clearItem());
		dispatch(changeLocation(id));

		axios(`/api/items/${id}`)
			.then(function (response) {
				const data = response.data;
				data.item.description = data.item.description.replace(/(?:\\[rn]|[\r\n])/g, "<br />");
				dispatch(ItemDuck.getItem(data));
			})
			.catch((error) => console.log("error: ", error));
	};

/***
 * @description Push to view search.
 * @param {String} value
 */
export const changeLocation = (value) => (dispatch) => {
	dispatch(push(`/items/${value}`));
};

/***
 * @description Clean state.
 */
export const clearItem = () => (dispatch) => {
	dispatch(ItemDuck.clearItem());
};