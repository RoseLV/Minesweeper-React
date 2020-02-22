import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game.js';

// <Board />  ->no props
// <Board size /> -> Board.props.size = true
// <Board size={9} />  -> Board.props.size = 9

// ========================================

ReactDOM.render(
  <Game />,
//   document.getElementById('root')
    document.querySelector('#root')
);

// const loadedStates = ['complete', 'loaded', 'interactive'];

// if (loadedStates.includes(document.readyState) && document.body) {
//   run();
// } else {
//   window.addEventListener('DOMContentLoaded', run, false);
// }
