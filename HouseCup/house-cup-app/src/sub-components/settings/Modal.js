import React, { Component } from 'react';
import Input from './Input.js';

class Modal extends Component {

  render() {
    return (
      
        <div className="Modal">
          <form 
            onSubmit={this.props.onSubmit}
            className="ModalForm">
            <Input
              id="username"
              type="text"
              placeholder="username" />
            <Input
              id="email"
              type="email"
              placeholder="your email" />
            <Input
              id="password"
              type="password"
              placeholder=" Old Password" />
            <Input
              id="password"
              type="password"
              placeholder="New Password" />  
            <button> Save </button>
          </form>
        </div>
      );
  
  }
}

export default Modal;