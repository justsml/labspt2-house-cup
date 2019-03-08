import React, { Component } from 'react';
import './App.css';

import { Route } from 'react-router-dom';

//landingPage imports:
import LandingPage from './sub-components/landingPage'

//publicPage imports:
import PublicPage from './sub-components/publicPage';
import scorboardTestData from './mock data/scoreboard';

//Admin import:
import AdminMainPage from './sub-components/adminMainPage';

//SignupPage import
import SignupPage from './sub-components/signupPage';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testData: scorboardTestData,
    }
  }

  confirmAddPoints = e => {
    console.log(e.target.parentNode.children[1].children[0].innerHTML);
    const houseTotals = this.state.testData.map(total => {
      return total.pointTotal
    })
    console.log(this.state.testData[0].pointTotal);
    console.log(houseTotals);
  }

  render() {
    return (
      <div className="App">
        <Route exact path='/' render={(props) => <PublicPage {...props} houseList={this.state.testData} />} />
        <Route exact path='/welcome' render={(props) => <LandingPage {...props} />} />
        <Route exact path='/admin' render={(props) => <AdminMainPage {...props} houseList={this.state.testData} confirmAddPoints={this.confirmAddPoints} />} />
        <Route exact path='/signup' render={(props) => <SignupPage {...props} houseList={this.state.testData} confirmAddPoints={this.confirmAddPoints} />} />
      </div>
    );
  }
}

export default App;
