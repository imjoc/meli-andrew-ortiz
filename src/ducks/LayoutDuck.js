const GO_HOME = "meli/layoutDuck/GO_HOME";

const initialState = {
};

export default function reducer (state = initialState, action = {}) {
	switch (action.type) {
		case GO_HOME:
			return initialState;
		default:
			return state;
	}
}