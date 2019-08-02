import {START_ROUND, START_GAME, END_ROUND} from '../actionTypes';

export const startGame = () => (dispatch, getState) => {

};

export const startRound = () => (dispatch, getState) => {
	dispatch({
		type: START_ROUND,
		payload: {settings:{}}
	})
};

export const endRound = () => (dispatch, getState) => {
	dispatch({
		type: END_ROUND,
	})
};