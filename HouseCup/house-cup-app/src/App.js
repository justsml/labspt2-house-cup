import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import { Route } from 'react-router-dom';
//landingPage imports:
import LandingPage from './sub-components/landingPage'
//publicPage import(s):
import PublicPage from './sub-components/publicPage';


//test data:
import scoreboardTestData from './mock data/scoreboard';
import testSchoolData from './mock data/schools';


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
import BillingPage from './sub-components/billingPage';
//About.js
import About from './sub-components/About';

import auth from './auth.js';
import schoolsTestData from './mock data/schools';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testData: scoreboardTestData,
      testData2: schoolsTestData,
      userData: [],
      schoolData: [],
      houseData: [],
    }
  }

  componentDidMount = e => {
    axios.get('http://localhost:5000/users')
      .then(response => {
        // console.log(response.data.data.allUsers)
        this.setState({userData: response.data.data.allUsers})
      })
      .catch(err => console.log(err));

    axios.get('http://localhost:5000/schools')
      .then(response => {
        // console.log(response.data.data.schools)
        this.setState({schoolData: response.data.data.schools})
      })
      .catch(err => console.log(err));
    axios.get('http://localhost:5000/houses')
      .then(response => {
        // console.log(response.data.data.houses)
        this.setState({houseData: response.data.data.houses})
      })
      .catch(err => {

      })
  }

  render() {
    return (
      <div className="App">
        <Route exact path='/' render={(props) => <LandingPage {...props} schoolsSelected={this.state.schoolData} />} />
        <Route exact path = '/callback' render={  (props) => <Callback />  }/>                                                       
        <Route exact path = '/admin/schools' render={(props) => <SchoolsPage {...props} houseList={this.state.testData}/> }/>
        <Route exact path = '/admin/houses' render={(props) => <AdminMainPage {...props} houseList={this.state.testData}/> }/>
        <SecuredRoute exact path = '/analytics' render={(props) => <AdminAnalyticsPage  />}/>
        <SecuredRoute exact path = '/admin/billing' component={BillingPage}/>
        <SecuredRoute exact path = '/admin/settings' render={(props) => <SettingsPage/>}/>
        <SecuredRoute path='/about' component={About} />
        <SecuredRoute exact path = '/admin/settings' render={(props) => <SettingsPage/>}/>
        <SecuredRoute exact path = '/admin/analytics' component={AdminAnalyticsPage} />
      </div>

    );
  }
}

export default App;
