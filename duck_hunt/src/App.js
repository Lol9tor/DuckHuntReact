import React from 'react';
import { Provider } from 'react-redux';

import store from './store/createStore';
import * as config from './config/gameConfig';
import Header from './components/Header';
// import Button from './components/Button';
import Field from './components/Field';

import styles from './App.module.scss';

function App() {
  /*function startGame() {
    socket.emit('startGame');
  }*/
  return (
    <Provider store={store}>
      <div className={styles.App}>
        <Header />
        <Field config={config} />
        {/*<div>
        <Button text="Start Game" onClick={startGame}/>
      </div>  */}
      </div>
    </Provider>
  );
}

export default App;
