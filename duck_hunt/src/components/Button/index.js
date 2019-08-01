import React from 'react';

import styles from './button.module.scss';

const Button = ({text, ...other}) => {
  return <button className={styles.button} {...other}>
    {text}
  </button>;
}
 
export default Button;