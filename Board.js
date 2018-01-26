import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Square from './Square.js';

export default class Board extends React.Component {

  renderSquare() {
    return <Square />;
  }
  // change the (9,9) => use props;  从line 11-line 33 应该和github里的row.js实现一样的；
  renderRow(numCols){
    var row = [];
    for(var i=0; i<numCols; i++){
      row.push(this.renderSquare());
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
      rows.push(this.renderRow(numCols))
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
