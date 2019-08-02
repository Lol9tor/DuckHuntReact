import React from 'react';

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
    <div className={styles.App}>
      <Header />
      <Field config={config} />
      {/*<div>
        <Button text="Start Game" onClick={startGame}/>
      </div>  */}
    </div>
  );
}

export default App;
