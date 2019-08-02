import { START_GAME, START_ROUND, END_ROUND } from '../actionTypes';

const initialState = {
	hits: 0,
	total: 0,
};

export default function score(state=initialState, action) {
	switch(action.type) {
		case START_GAME:
			return state;
		case START_ROUND:
			return state;
		case END_ROUND:
			return {
				...state,
				...action.payload.score,
			};
		default:
			return state;
	}
}