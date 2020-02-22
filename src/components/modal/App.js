import React from 'react'
import './App.styl';

export const Modal = props => {

  return (
      <div className="MSG_MODAL">
        {
          props.msg === 'Game Over'
          ?
          <div className="alert alert-danger">{props.msg}</div>
          :
          <div className="alert alert-success">{props.msg}</div>
        }
      </div>
  )
}