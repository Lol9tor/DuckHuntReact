const ROUND_TIME = 5000;
const MIN_GAME_TIME = 9000;
const MAX_GAME_TIME = 20000;

const DIRECTIONS = {
	// 'left': {x:-1,y:0},
	'right': {x:1,y:0},
	'up': {x:0,y:1},
	'down': {x:0,y:-1},
	// 'left-down': {x:-1,y:-1},
	// 'left-up': {x:-1,y:1},
	'right-up': {x:1,y:1},
	'right-down': {x:1,y:-1},
};
const SPEEDS = {
	'low': 8,
	'medium': 6,
	'high': 4,
	'incredible': 3,
};

function getRandomNumber(min, max) {
	return min + Math.round(Math.random()*(max-min))
}

function getRandomSpeed() {
  const speeds = Object.keys(SPEEDS);
  const randomSpeed = speeds[getRandomNumber(0, speeds.length-1)];
  return SPEEDS[randomSpeed];
}

function getRandomDirection() {
	const directions = Object.keys(DIRECTIONS);
	const randomDirection = directions[getRandomNumber(0, directions.length-1)];
  return DIRECTIONS[randomDirection];
}

module.exports = function (socket) {
	const score = {
		total: 0,
		hits: 0,
	};
	let timerStartRound = null;
	let timerEndRound = null;

	function startRound() {
		socket.emit('startRound', {
			settings: {
				speed: getRandomSpeed(),
				direction: getRandomDirection(),
				position: {
					x: getRandomNumber(0,100), //conventional units
					y: getRandomNumber(0,100), //conventional units
				},
			},
		});
		timerEndRound = setTimeout(() => {
			endRound();
		}, ROUND_TIME);
		timerStartRound = setTimeout(() => {
			clearTimeout(timerStartRound);
			timerStartRound = null;
			startRound();
		}, getRandomNumber(MIN_GAME_TIME, MAX_GAME_TIME));//round starts every 9 to 20 seconds
	}

	function endRound(isRichTarget) {
		clearTimeout(timerEndRound);
		timerEndRound = null;
		score.total += 1;
		score.hits = isRichTarget? score.hits+1: score.hits;
		socket.emit('endRound', {
			isRoundFinished: true,
			isRichTarget: !!isRichTarget,
			score: score,
		});
	}

	startRound();
	socket.on('shootDuck', () => {
		endRound(true);
	});

};