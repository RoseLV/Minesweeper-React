import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Square 是和 cell一样的；
export default class Square extends React.Component {

   /* constructor(props) {
        super(props);
        this.state = {
            hasMine : props.cell.hasMine,
            hasFlag : props.cell.hasFlag,
            isOpened : props.cell.isOpened,
            // openNUm
            count : 0
        };
    }
  */
  /*
  handleClick(){



  }
  */
  render() {
    return (
      <button className="square"   >
        {this.props.value}
      </button>
    );
  }
}
