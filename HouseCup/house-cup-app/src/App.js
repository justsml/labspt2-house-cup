import React, { Component } from 'react';
import './App.css';

import {Route} from 'react-router-dom';

//publicPage imports:
import PublicPage from './sub-components/publicPage';
import scorboardTestData from './mock data/scoreboard';

//Admin import:
import AdminMainPage from './sub-components/adminMainPage';


class App extends Component {
  constructor(props){
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
        <Route exact path = '/' render={ (props) => <PublicPage {...props} houseList={this.state.testData}/> }/>
        <Route exact path = '/admin' render={(props) => <AdminMainPage {...props} houseList={this.state.testData} confirmAddPoints={this.confirmAddPoints}/> }/>
        {/* {this.state.testData.map(eachObject => {
          return (
            <div>{eachObject.pointTotal}</div>
          )
        })} */}
      </div>
    );
  }
}

export default App;
