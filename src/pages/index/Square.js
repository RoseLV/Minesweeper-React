import React from 'react';
import flag from './assets/flag.png'
import mine from './assets/mine.png'
import mine1 from './assets/mine-1.png'
import mine2 from './assets/mine-2.png'
import mine3 from './assets/mine-3.png'
import mine4 from './assets/mine-4.png'
import mine5 from './assets/mine-5.png'
import rev_empty from './assets/rev_empty.png'
import unrev_cell from './assets/unrev_cell.png'

import './index.css';

const minesMap = {
  'mine1': mine1,
  'mine2': mine2,
  'mine3': mine3,
  'mine4': mine4,
  'mine5': mine5
}
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
    let value = unrev_cell;

    if (!this.props.data.isRevealed && this.props.data.isFlag) {
      value = flag;
    }

    if (this.props.data.isRevealed) {
      value = minesMap[`mine${this.props.data.count}`];
      if (this.props.data.isMine) {
        value = mine;
      }
      if(this.props.data.count===0){
        value = rev_empty;
      }
   }

   var className = "square";
   if (!this.props.data.isRevealed){
    className += " square-covered";
  }

    return (
      <button className={className} onClick={this.props.onClick} onContextMenu={this.props.onRightClick}>
        {/* {value} */}
        <img src={value} alt='cell'/>
      </button>
    );
  }
}
