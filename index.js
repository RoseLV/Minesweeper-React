import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import Board from './Board.js';
//import Square from './Square.js';
import Game from './Game.js';

// <Board />  ->no props
// <Board size /> -> Board.props.size = true
// <Board size={9} />  -> Board.props.size = 9



// ========================================
// 这里的level只是pass through text ‘easy’， & ‘hard’而已；
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
