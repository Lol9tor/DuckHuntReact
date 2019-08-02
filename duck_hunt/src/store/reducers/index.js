import { combineReducers } from 'redux';
import score from './score';
import rounds from './rounds';

export default combineReducers({
	score,
	rounds,
});