import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styles from './sprite.module.scss';

const emptyFn = () => {};

const Sprite = ({type, position, onClick}) => {
	const clickHandler = type === "duck-smashed"? emptyFn: onClick;
  return <div
	  className={`${styles.sprite} ${styles[type]||''}`}
	  style={{transform: `translate(${position.x}px, ${position.y}px)`}}
	  onClick={clickHandler}
  />
};

Sprite.propTypes = {
	type: PropTypes.oneOf([
		"duck-state-1", "duck-state-2", "duck-smashed", ""
	]).isRequired,
	position: PropTypes.shape({
		x: PropTypes.number,
		y: PropTypes.number,
	}).isRequired,
};

export default Sprite;