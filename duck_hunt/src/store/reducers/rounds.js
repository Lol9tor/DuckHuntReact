import { START_GAME, START_ROUND, END_ROUND } from '../actionTypes';

const initialState = {
	list: [],
	current: null,
};

export default function rounds(state=initialState, action) {
	switch(action.type) {
		case START_GAME:
			return state;
		case START_ROUND:
			return {
				...state,
				current: action.payload,
				list: state.list.concat(action.payload.settings)
			};
		case END_ROUND:
			return state;
		default:
			return state;
	}
}