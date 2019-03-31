import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
//landingPage imports:
import LandingPage from './sub-components/landingPage'
//publicPage import(s):
// import PublicPage from './sub-components/publicPage';
import scoreboardTestData from './mock data/scoreboard';
//Admin import(s):
import AdminMainPage from './sub-components/adminMainPage';

//Billings import(s):
// import BillingPage from './sub-components/billingPage';

//Settings import(s):
import SettingsPage from './sub-components/settingsPage';

//SignupPage import
import SignupPage from './sub-components/signupPage';
import SchoolsPage from './sub-components/schoolsPage';

//adminAnalyticsPage
import AdminAnalyticsPage from './sub-components/analytics/AdminAnalyticsPage';
//CallbackPage for Auth0.js
import Callback from './Callback.js';
//Secured Route
import SecuredRoute from './sub-components/SecuredRoute';
//Auth0.js
// import NavBar from './sub-components/NavBar';
import billingPage from './sub-components/billingPage';
//About.js
import About from './sub-components/About';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testData: scoreboardTestData,
    
    }
  }

  render() {
    return (
      <div className="App">
        {/* <NavBar /> */}
        <Route exact path='/' render={(props) => <LandingPage {...props} />} />
        <Route exact path = '/callback' render={  (props) => <Callback />  }/>
        <Route exact path='/signup' render={(props) => <SignupPage {...props} houseList={this.state.testData} confirmAddPoints={this.confirmAddPoints} />} />
        <Route exact path = '/admin' render={(props) => <AdminMainPage {...props} houseList={this.state.testData}/> }/>
        <Route exact path = '/admin/schools' render={(props) => <SchoolsPage {...props} houseList={this.state.testData}/> }/>
        <SecuredRoute path='/about' component={About} />
        <SecuredRoute path = '/admin/billing' component={billingPage}/>
        <SecuredRoute exact path = '/admin/settings' render={(props) => <SettingsPage/>}/>
        <SecuredRoute exact path = '/scoreboard/analytics' component={AdminAnalyticsPage} />
        {/* <Route exact path = '/scoreboard/analytics' render={(props) => <AdminAnalyticsPage  />}/> */}

      </div>

    );
  }
}

export default App;
