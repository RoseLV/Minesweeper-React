import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Square 是和 cell一样的；
export default class Square extends React.Component {
  /*  this.props.data = {
      hasMine : false,
      hasFlag : false,
      isOpened : false,
      openGridNum: 0,
      minesLeft : mines //???
    } // how to move tab foreward

  this.props.onClick(){}
  this.props.onRightClick()*/
  // turn off right click menu
  render() {
    let value = '';

    if (!this.props.data.isRevealed && this.props.data.isFlag) {
      value = 'F';
    }

    if (this.props.data.isRevealed) {
      value = this.props.data.count;
      if (this.props.data.isMine) {
        value = '*';
      }
      if(this.props.data.count===0){
        value = '';
      }
   }

   var className = "square";
   if (!this.props.data.isRevealed){
    className += " square-covered";
  }

    return (
      // why I cant have div here
      <button className={className} onClick={this.props.onClick} onContextMenu={this.props.onRightClick}>
        {value}
      </button>

    );
  }
}
