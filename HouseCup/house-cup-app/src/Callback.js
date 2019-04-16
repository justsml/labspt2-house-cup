import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth from './auth';

class Callback extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  async componentDidMount() {
    await auth.handleAuthentication();
    this.props.history.replace('/admin/schools/:id');
  }
  render() {
    return (
      <p>Loading profile...</p>
    );
  }
}

export default withRouter(Callback);
