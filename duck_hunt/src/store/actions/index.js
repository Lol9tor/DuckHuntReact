import {START_ROUND, START_GAME, END_ROUND} from '../actionTypes';

export const startGame = () => (dispatch, getState) => {

};

export const startRound = (data) => (dispatch, getState) => {
	dispatch({
		type: START_ROUND,
		payload: data,
	})
};

export const endRound = (data) => (dispatch, getState) => {
	dispatch({
		type: END_ROUND,
		payload: data,
	})
};