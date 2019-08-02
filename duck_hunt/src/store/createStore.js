import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

function initStore() {
	let store;

	if (window.__REDUX_DEVTOOLS_EXTENSION__) {
		store = createStore(
			rootReducer,
			compose(
				applyMiddleware(thunk),
				window.__REDUX_DEVTOOLS_EXTENSION__ &&
				window.__REDUX_DEVTOOLS_EXTENSION__()
			)
		);
	} else {
		store = createStore(
			rootReducer,
			applyMiddleware(thunk)
		);
	}

	return store;
}

const store = initStore();

export default store;
