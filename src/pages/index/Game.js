import React from 'react';
import Board from './Board.js';
import { Modal } from '../../components/modal/App'
import './index.css';

const LEVELS = {
  easy: {
    rows: 9,
    cols: 9,
    mines: 1,
  },
  medium: {
    rows: 13,
    cols: 13,
    mines: 40,
  },
  hard: {
    rows: 20,
    cols: 20,
    mines: 100,
  }
}

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // selected level, references LEVELS object above
      // possible values are "easy", "medium", "difficult"
      level: null,

      // until level is selected, we won't know the number
      // of mines left, or the size of the minesArray,
      // so set them to null here
      minesLeft: null,
      minesArray: null,

      // default values for inGame (win/lose) and
      // number of squares revealed
      inGame: false,
      numRevealed: 0,

      isModalShow: false,
      modalMsg: ''
    };
  }

  startLevel(difficulty) {
    
    let minesArray = null;
    let minesLeft = null;
    var inGame = false;
    
    if (difficulty !== null) {
      // when press level select button, create minesArray
      // but need to give the rows, cols and mines using LEVELS object - setMinesArray
      minesArray = this.setMineArray(LEVELS[difficulty])
      minesLeft = LEVELS[difficulty].mines;
      inGame = true;
    }
    
    if (difficulty === null) {
      this.setState({
        isModalShow: false,
        modalMsg: ''
      })
    }
    
    this.setState({
      level: difficulty,
      minesArray: minesArray,
      minesLeft: minesLeft,
      numRevealed: 0, // <- was missing
      inGame: inGame,
    });
    
  }

  setMineArray(level) {
    var rows = level.rows;
    var cols = level.cols;
    var mines = level.mines;

    var minesArray = [];
    for(var i = 0; i < rows; i++) {
      var minesRow = [];
      for(var j = 0; j < cols; j++) {
        // what should be write in minesArray?
        minesRow.push({
          count: 0,           // number of neighbor mines
          isRevealed : false, // cell has been clicked
          isMine : false,     // cell is a mine cell
          isFlag : false,     // cell is flagged
        });
      }
      minesArray.push(minesRow);
    }

    // randomly generate number of mines //2D array
    for(var m = 0; m < mines; m++) {
      var mi = Math.floor(Math.random()*rows);
      var mj = Math.floor(Math.random()*cols);
      var cell = minesArray[mi][mj];
      if(cell.isMine) {
        m--; // no repeated
      } else {
        cell.isMine = true;

        // count mines in 8 neighbors
        for (var xoff = -1; xoff <= 1; xoff++) {
          var i = mi + xoff;
          if (i < 0 || i >= cols) continue;

          for (var yoff = -1; yoff <= 1; yoff++) {
            var j = mj + yoff;
            if (j < 0 || j >= rows) continue;

            var neighbor = minesArray[i][j];
            neighbor.count++; // Line80
          }
        }
      }
    }
    return minesArray;
  }

  revealAll(){
    // when set state with new Array, need a copy
    var newMinesArray = this.state.minesArray.slice() ;
    var cols = LEVELS[this.state.level].rows;
    var rows = LEVELS[this.state.level].cols;
    for (var a = 0; a < cols; a++) {
      for (var b = 0; b < rows; b++) {
        if(newMinesArray[a][b].isMine){  //  only reveal mines
        newMinesArray[a][b].isRevealed = true;
      }
    }
  }
    return newMinesArray;
  }

  floodFill (minesArray, x, y) {
    var revealed = 0;
    var cols = LEVELS[this.state.level].rows;
    var rows = LEVELS[this.state.level].cols;
    for (var xoff = -1; xoff <= 1; xoff++) {
      var i = x + xoff;
      if (i < 0 || i >= cols) continue;

      for (var yoff = -1; yoff <= 1; yoff++) {
        var j = y + yoff;
        if (j < 0 || j >= rows) continue;

        var neighbor = minesArray[i][j];
        if (!neighbor.isRevealed && !neighbor.isFlag) {
          revealed += this.reveal(minesArray, i, j);
        }
      }
    }
    return revealed;
  }

  reveal (minesArray, i, j) {
    var revealed = 1; // firstclick
    var cell = minesArray[i][j];
    cell.isRevealed = true;
    if(cell.count === 0) {
      revealed += this.floodFill(minesArray, i, j);
    }
    return revealed;
  }

  handleOnClick (i, j) {
    
    console.log('state', this.state)
    var cols = LEVELS[this.state.level].rows;
    var rows = LEVELS[this.state.level].cols;
    var mines = LEVELS[this.state.level].mines;
    var newMinesArray = this.state.minesArray.slice()
    
    var cell = newMinesArray[i][j];
    var numRevealed = this.state.numRevealed;

    if(this.state.inGame) {
      
      if(cell.isRevealed) {
        return;
      }

      if(!cell.isMine) {
        cell.isRevealed = true;
        numRevealed += this.reveal(newMinesArray, i, j); 
        this.setState({
          minesArray: newMinesArray,
          numRevealed: numRevealed,
        });
      } 

      else {
        // alert('Game Over');
        this.setState({
          inGame: false,
          minesArray: this.revealAll(), // revealAll() returns a copy of minesArray;
          isModalShow: true,
          modalMsg: 'Game Over'
        });
      }
    }

    if(this.state.inGame && this.state.minesLeft === 0 && (numRevealed + mines)===rows*cols){
      // alert('Game Win');
      this.setState({
        inGame: false,
        isModalShow: true,
        modalMsg: 'Game Win'
      });
    }
  }

  handleRightClick (i, j) {
    const { rows, cols, mines } = LEVELS[this.state.level];
    // var rows = LEVELS[this.state.level].rows;
    // var cols = LEVELS[this.state.level].cols;
    // var mines = LEVELS[this.state.level].mines;
    var newMinesArray = this.state.minesArray.slice()
    var cell = newMinesArray[i][j];
    var minesLeft = this.state.minesLeft;
    if(this.state.inGame && minesLeft > 0){
      if(cell.isRevealed===true){
        return;
      }
      if(cell.isFlag===false){
        cell.isFlag = true;
        minesLeft--;
        this.setState({
          minesArray: newMinesArray,
          minesLeft: minesLeft   // same as just minesLeft
        });
      } else {
        cell.isFlag = false;
        minesLeft++;
        this.setState({
          minesArray: newMinesArray,
          minesLeft
        });
      }

      if(this.state.inGame && minesLeft === 0 && (this.state.numRevealed + mines)===rows*cols){
        // alert('Game Win');
        this.setState({
          inGame: false,
          isModalShow: true,
          modalMsg: 'Game Win'
        });
      }
    }
  }


//=====================================

  render() {
    if (this.state.level === null) {
      return (
        <div className="game">
          <button type="button" className="game_level btn btn-success" onClick={() => this.startLevel("easy")}>Easy</button>
          <button type="button" className="game_level btn btn-info" onClick={() => this.startLevel("medium")}>Medium</button>
          <button type="button" className="game_level btn btn-danger" onClick={() => this.startLevel("hard")}>Hard</button>
        </div>
      );
    }

    var rows = LEVELS[this.state.level].rows;
    var cols = LEVELS[this.state.level].cols;
    var mines = LEVELS[this.state.level].mines;

  
    return(
      <div className="game">
        
        {
          this.state.isModalShow 
          ?
          <Modal msg={this.state.modalMsg}/>
          :
          null
        }
        <div className="game_panel">
          <p>Mines left:  {this.state.minesLeft} </p>
          <button type="button" className="game_level btn btn-dark" onClick={() => this.startLevel(null)}>Exit</button>
          <p>Revealed:  {this.state.numRevealed} </p>
        </div>
        
        <div className="game_board">
          <Board className="afterClick"
            rows={rows}
            cols={cols}
            reveal={this.handleOnClick.bind(this)} // this.onClick() -> send the result of the function;
            flag={this.handleRightClick.bind(this)}
            minesArray = {this.state.minesArray}
            isRevealed = {this.state.isRevealed}
          />
        </div>
      </div>
    );
  }
}

window.oncontextmenu = function() {
  return false;
};
