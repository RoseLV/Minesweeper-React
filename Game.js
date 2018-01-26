import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board.js';

const LEVELS = {
  // is easy a string?
  easy: {
    rows: 10,
    cols: 10,
    mines: 10,
  },
  medium: {
    rows: 15,
    cols: 15,
    mines: 15,
  }
}

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      level: null,
      //squares: Array(props.rows*props.cols).fill(null),
      flagNum : 0,
      openNum : 0,
      //minesLeft: mines;
      minesArray: [],
      time : 0,

      //status : "playing"
    };
  }

  startLevel(difficulty) {
    this.setState({
      ...this.state,
      level: difficulty
    });
}
    //4.59PM - create an array with mine cells & empty cells;
    /* setMineArray(){
          var minesArray = [];
          for(var row = 0; row < LEVELS[this.state.level].rows; row++){
            minesArray.push([]);
              for(var col = 0; col < LEVELS[this.state.level].cols; col++){
                minesArray[row].push({
                    x : col,
                    y : row,
                    count : 0,
                    isOpened : false,
                    hasMine : false,
                    hasFlag : false
                });
              }
          }

          for(var i = 0; i < LEVELS[this.state.level].mines; i++){
                      var cell = minesArray[Math.floor(Math.random()*LEVELS[this.state.level].rows)][Math.floor(Math.random()*LEVELS[this.state.level].rows)];
                      if(cell.hasMine){
                          i--;
                      } else {
                          cell.hasMine = true;
                      }
                  }
                  return minesArray;
          }
      }
  }
  */

// "easy" in L46 is same as easy in Line8?

// L53 rows same as L9 rows ? ；

//=====================================

  render() {
    if (this.state.level === null) {
      return (
        <div className="game">
          <button onClick={() => this.startLevel("easy")}>Easy</button>
          <button onClick={() => this.startLevel("medium")}>Medium</button>
        </div>
      );
    }

    var rows = LEVELS[this.state.level].rows;
    var cols = LEVELS[this.state.level].cols;
    var mines = LEVELS[this.state.level].mines;

    return (
      <div>
        <button onClick={() => this.startLevel(null)}>Exit</button>
        <div className="game">
          <div className="game-board">
            <Board rows={rows} cols={cols} mines = {mines}/>
          </div>
        </div>
        <div>
          <p>Mines left:  {LEVELS[this.state.level].mines} </p>
        </div>
      </div>
    );
  }
}
