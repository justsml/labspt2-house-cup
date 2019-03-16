import React, { Component } from 'react';
import './App.css';

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

//adminAnalyticsPage
import AdminAnalyticsPage from './sub-components/analytics/AdminAnalyticsPage';

//CallbackPage for Auth0.js
import Callback from './sub-components/Callback.js';

//Auth0.js
import Auth from './Auth';
const auth = new Auth();


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testData: scoreboardTestData,
      auth
    }
  }

  render() {
    return (
      <div className="App">
        <Route exact path='/' render={(props) => <LandingPage {...props} auth={this.state.auth}/>} />
        <Route exact path='/signup' render={(props) => <SignupPage {...props} houseList={this.state.testData} confirmAddPoints={this.confirmAddPoints} />} />
        <Route exact path = '/admin' render={(props) => <AdminMainPage {...props} houseList={this.state.testData}/> }/>
        <Route exact path = '/admin/billing' render={(props) => <BillingPage {...props} premiumPrice={'$19.99'}/>}/>
        <Route exact path = '/admin/settings' render={(props) => <SettingsPage/>}/>
        <Route exact path = '/analytics' render={(props) => <AdminAnalyticsPage  />}/>
        <Route exact path = '/callback' render={  (props) => <Callback />  }/>


      </div>
    );
  }
}

export default App;
