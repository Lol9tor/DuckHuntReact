import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import socket from "../../socketClient";

import { startGame, startRound, endRound } from '../../store/actions';

import styles from './field.module.scss';
import Sprite from "../Sprite";
import Score from "../Score";

import audioShoot from '../../assets/audio/awp.mp3';
import audioDuck from '../../assets/audio/quack.mp3';

const shootSound = new Audio(audioShoot);
const duckSound = new Audio(audioDuck);
duckSound.loop = true;

const FRAME_TICK = 17; //ms default requestAnimationFrame tick
const defaultState = {
  duckPosition:{x:0,y:0},
  tickSpeed: 0,
  direction: '',
  spriteType: ''
};

class Field extends Component {
  constructor(props){
    super();
    this.state = {
      ...defaultState,
      score: {
        hits:0,
        total:0,
      }
    };
    this.tick = 0;
  }
  componentDidMount() {
    socket.on('startRound', this.startRound);
    socket.on('endRound', this.endRound);
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.frame);
    socket.off('startRound', this.startRound);
    socket.off('endRound', this.endRound);
  }
  componentWillReceiveProps(nextProps, nextContext) {
    console.log('new props',this.props);
  }

  startRound = ({settings}) => {
    // this.props.actions.startRound({settings});
    console.log(settings);
    const {position, speed, direction} = settings;
    this.setState({
      duckPosition: this.getDuckPosition(position, speed, direction),
      tickSpeed: speed,
      direction: direction,
    }, () => {
      this.startDuckAnimation(speed);
    });
  };

  endRound = ({isRoundFinished, isRichTarget, score}) => {
    // this.props.actions.endRound({isRoundFinished, isRichTarget, score});
    duckSound.pause();
    cancelAnimationFrame(this.frame);
    this.tick = 0;
    this.setState((prev)=>({
      score: score,
    }));
    if (isRichTarget){
      setTimeout(() => {
        this.resetRoundState();
      }, this.props.config.SHOW_SMASHED_DUCK);
    } else {
      this.resetRoundState();
    }
  };

  resetRoundState = () => {
    this.setState({
      ...defaultState
    });
  };

  getDuckPosition = (pos, speed, dir) => {
    const {WIDTH, HEIGHT, ROUND_TIME, STEP_BY_TICK_X,
      STEP_BY_TICK_Y, GRASS_LEVEL } = this.props.config;
    const MIN_RIGHT_BORDER = (ROUND_TIME/(speed*FRAME_TICK))*STEP_BY_TICK_X;
    const MIN_BOTTOM_BORDER = (ROUND_TIME/(speed*FRAME_TICK))*STEP_BY_TICK_Y;

    return {
      x: ((WIDTH-MIN_RIGHT_BORDER)*(pos.x/100)), // because of conventional unit
      y: (HEIGHT-GRASS_LEVEL-MIN_BOTTOM_BORDER)*(pos.y/100),
    };
  };

  startDuckAnimation = () => {
    duckSound.play();
    if (this.tick === this.state.tickSpeed){
      this.tick = 0;
      this.moveDuck();
    }
    this.tick += 1;

    this.frame = requestAnimationFrame(this.startDuckAnimation);
  };

  moveDuck = () => {
    const spriteType = this.state.spriteType!=='duck-state-1'?'duck-state-1':'duck-state-2';
    const {duckPosition, direction} = this.state;
    const {STEP_BY_TICK_X, STEP_BY_TICK_Y} = this.props.config;
    this.setState({
      spriteType: spriteType,
      duckPosition: {
        x:duckPosition.x+STEP_BY_TICK_X*direction.x,
        y:duckPosition.y+STEP_BY_TICK_Y*direction.y,
      },
    });
  };

  shootDuck = () => {
    shootSound.play();
    this.setState({
      spriteType: 'duck-smashed',
    });
    socket.emit('shootDuck');
  };

  render() {
    const {WIDTH, HEIGHT} = this.props.config;
    const {duckPosition, tickSpeed, spriteType, score} = this.state;
    return <div
      className={styles.field}
      style={{width: WIDTH+'px', height:HEIGHT+'px'}}
    >
      <Score hits={score.hits} total={score.total}/>
      <Sprite type={spriteType} position={duckPosition} onClick={this.shootDuck}/>
    </div>
  }
}

Field.propTypes = {
  config: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => ({
  score: state.score,
  currentRound: state.rounds.current,
  rounds: state.rounds.list,
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ startRound, endRound }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Field);