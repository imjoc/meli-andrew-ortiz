const GET_ITEM = "meli/itemDuck/GET_ITEM";
const CLEAR_ITEM = "meli/itemDuck/CLEAR_ITEM";

const initialState = {
	data: {
		categories: []
	},
	loading: true
};

export default function reducer (state = initialState, action = {}) {
	switch (action.type) {
		case CLEAR_ITEM:
			return initialState;
		case GET_ITEM:
			return {...state, data: action.payload, loading: false};
		default:
			return state;
	}
}

export function getItem (data) {
	return {type: GET_ITEM, payload: data};
}

export function clearItem () {
	return {type: CLEAR_ITEM};
}