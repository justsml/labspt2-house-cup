import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import { Route } from 'react-router-dom';

//landingPage imports:
import LandingPage from './sub-components/landingPage'

//publicPage import(s):
import PublicPage from './sub-components/publicPage';
import scoreboardTestData from './mock data/scoreboard';

//Admin import(s):
import AdminMainPage from './sub-components/adminMainPage';

//Billings import(s):
import BillingPage from './sub-components/billingPage';

//Settings import(s):
import SettingsPage from './sub-components/settingsPage';
//SignupPage import
import SignupPage from './sub-components/signupPage';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testData: scoreboardTestData,
    }
  }

  componentDidMount = e => {
    axios.get('https://labspt2-housecup.herokuapp.com/users')
      .then(response => this.setState({userList: response.data.data.allUsers}))
      .catch(err => console.log(err));
    axios.get()
  }

  render() {
    return (
      <div className="App">
        <Route exact path='/' render={(props) => <LandingPage {...props} />} />
        <Route exact path='/signup' render={(props) => <SignupPage {...props} houseList={this.state.testData} />} />
        <Route exact path = '/public' render={ (props) => <PublicPage {...props} houseList={this.state.testData}/> }/>
        <Route exact path = '/admin' render={(props) => <AdminMainPage {...props} houseList={this.state.testData}/> }/>
        <Route exact path = '/admin/billing' render={(props) => <BillingPage {...props} premiumPrice={'$19.99'}/>}/>
        <Route exact path = '/admin/settings' render={(props) => <SettingsPage/>}/>
      </div>
    );
  }
}

export default App;
