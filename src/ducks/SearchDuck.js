const SEARCH_ITEMS = "meli/searchDuck/SEARCH_ITEMS";
const CLEAN_STATE = "meli/searchDuck/CLEAN_STATE";
const SEARCH_VALUE = "meli/searchDuck/SEARCH_VALUE";
const SEARCH_NOFOUND = "meli/searchDuck/SEARCH_NOFOUND";

const initialState = {
	results: {
		items: []
	},
	search_value: null,
	loading: true
};

export default function reducer (state = initialState, action = {}) {
	switch (action.type) {
		case CLEAN_STATE:
			return {...state, results: initialState.results, loading: action.payload};
		case SEARCH_NOFOUND:

			const newState = {
				results: {
					items: []
				},
				search_value: null,
				loading: false
			};

			return {...state, results: newState };
		case SEARCH_VALUE:
			return {...state, search_value: action.payload};
		case SEARCH_ITEMS:
			return {...state, results: action.payload, loading: false};
		default:
			return state;
	}
}

export const searchItems = (data) => ({
	type: SEARCH_ITEMS, payload: data
});

export const clearState = (loading) => ({
	type: CLEAN_STATE, payload: loading
});

export const setSearchValue = (value) => ({
	type: SEARCH_VALUE, payload: value
});

export const noFoundResults = () => ({
	type: SEARCH_VALUE
});