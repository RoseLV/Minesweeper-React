import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Square from './Square.js';

export default class Board extends React.Component {

  renderSquare(i, j) {
    return (
      <Square
        data={this.props.minesArray[i][j]}
        onClick={() => this.props.reveal(i, j)}
        onRightClick={() => this.props.flag(i, j)
        }
      />
    );
  }
  // change the (9,9) => use props;  从line 11-line
  renderRow(i, numCols){
    var row = [];
    for(var j=0; j<numCols; j++){
      row.push(this.renderSquare(i, j));
    }
    return (
      <div className="board-row">
        {row}
      </div>
    );
  }

  renderRows(numRows, numCols) {
    var rows = []
    for(var i=0; i<numRows; i++)
      rows.push(this.renderRow(i, numCols))
    return (
      <div>
        {rows}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderRows(this.props.rows, this.props.cols)}
      </div>
    );
  }
}
