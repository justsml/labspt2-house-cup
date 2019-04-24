import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Route } from 'react-router-dom';
//landingPage imports:
import LandingPage from './sub-components/LandingPage'
//test data:
import scoreboardTestData from './mock data/scoreboard';
//Admin import(s):
import Houses from './sub-components/HousesPage';
//Settings import(s):
import SettingsPage from './sub-components/SettingsPage';
//SignupPage import
import SchoolsPage from './sub-components/SchoolsPage';
//adminAnalyticsPage
import AdminAnalyticsPage from './sub-components/analytics/AdminAnalyticsPage';
// import AnalyticsPage from './sub-components/analytics/AnalyticsPage';
//CallbackPage for Auth0.js
import Callback from './Callback.js';
//Secured Route
import SecuredRoute from './sub-components/SecuredRoute';
//Auth0.js
// import NavBar from './sub-components/NavBar';
import BillingPage from './sub-components/billingPage';
//About.js
import About from './sub-components/About';
import schoolsTestData from './mock data/schools';
import auth from './utils/Auth.js';


 
class App extends Component {
    constructor(props) {
        super(props);
          this.state =  {
              testData: scoreboardTestData,
              testData2: schoolsTestData,
              userData: [],
              schoolData: [],
              houseData: [],
              name: null,
              email:  null, 

          }
    }
     
  
 
  componentDidMount = () => {
   
     this.setState({
      authProfile:auth.getProfile(),
      authIdToken:auth.getIdToken()
    })
    // console.log(this.state.authProfile);
    // console.log(this.state.authIdToken)
    axios.get('http://localhost:5000/users')
      .then(response => {
        // console.log(response.data.data.allUsers)
        this.setState({userData: response.data.data.allUsers})
      })
      .catch(err => console.log(err));

    axios.get('https://labspt2-housecup.herokuapp.com/schools')
      .then(response => {
        console.log(response.data.data.schools)
        this.setState({schoolData: response.data.data.schools})
      })

      .catch(err => console.log(err));
    axios.get('https://labspt2-housecup.herokuapp.com/houses')
      .then(response => {
        // console.log(response.data.data.houses)
        this.setState({houseData: response.data.data.houses})
      })
      .catch(err => {
            console.log(err)
      });  
      
        
  //  console.log(this.state.name)
       
  }
  
  getId = id => {
    this.setState({
       schoolId: id
    })
  }

  componentWillMount =() => {
    
  }
  
  render() {
    
    return (
      <div className="App">
        <Route exact path='/' render={(props) => <LandingPage {...props} schoolsSelected={this.state.schoolData} />} />
        <Route exact path = '/callback' render={  (props) => <Callback />  }/>                                                       
        <Route exact path = '/admin/schools' render={(props) =>
             <SchoolsPage {...props} 
                          schools={this.state.schoolData} 
                           houseList={this.state.testData}/> }/>
        <Route exact path = '/admin/schools/:id' render={(props) => <Houses {...props} houseList={this.state.testData}/> }/>
        {/* <SecuredRoute exact path = '/analytics' render={(props) => <AdminAnalyticsPage  />}/> */}
        <SecuredRoute exact path = '/admin/billing' component={BillingPage}/>
        <SecuredRoute exact path = '/admin/settings' render={(props) => <SettingsPage/>}/>
        <SecuredRoute path='/about' component={About} />
        <SecuredRoute exact path = '/admin/settings' render={(props) => <SettingsPage/>}/>
        <SecuredRoute exact path = '/admin/analytics' id={3} component={AdminAnalyticsPage} />
      </div>

    );
  }

}
export default App;
