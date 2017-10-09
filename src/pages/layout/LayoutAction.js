import { push } from "react-router-redux";

import * as LayoutDuck from "../../ducks/LayoutDuck";

/***
 * @description Push to view home.
 */
export const goHome = () => (dispatch) => {
	dispatch(push("/"));
};