import React, {memo} from 'react';
import PropTypes from 'prop-types';

import styles from './score.module.scss';

const Score = ({hits, total}) => {
  return <div className={styles.score}>
		<div>Target hits: <b>{hits}</b></div>
		<div>Total games: <b>{total}</b></div>
  </div>
};

Score.propTypes = {
	hits: PropTypes.number.isRequired,
	total: PropTypes.number.isRequired,
};

export default memo(Score);