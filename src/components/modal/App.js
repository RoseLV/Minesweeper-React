import React from 'react'
import './App.styl';

export const Modal = props => {

  return (
      <div className="MSG_MODAL">
        <p>
          {props.msg}
        </p>
      </div>
  )
}