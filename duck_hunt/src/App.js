import React from 'react';

import Header from './components/Header';
import Button from './components/Button';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <div>
        <Button text="Start"/>
      </div>  
    </div>
  );
}

export default App;
