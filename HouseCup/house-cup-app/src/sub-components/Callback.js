import React, { Component } from 'react';
import Auth from '../Auth.js';

export default class Callback extends Component {
  componentDidMount() {
    const auth = new Auth();
    auth.handleAuthentication();
  }

  render() {
       console.log(`Callback.js`, Auth)
        return (
          <div>
            <h1>Loading...</h1>
          </div>
        );
  }
}
