import auth0 from 'auth0-js';
import axios from 'axios';


class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'venky-yagatilee.auth0.com',
      clientID: '46Ngw5RelPCvdaCoKrqPvIWyvgFQBqvx',
      redirectUri: 'http://localhost:3000/callback',
      audience: 'https://venky-yagatilee.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid profile email'
    });
    this.state = {
      firstName: 'test',
      lastName: '1',
    }

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    console.log('asdf');
    // axios.post('http://localhost:5000/users/register', {
    //   firstName: this.state.firstName,
    //   lastName: this.state.lastName,
    //   email: 
    // })
  }

  
  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        console.log(`Auth Results`, authResult)
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        
            
        // set the time that the id token will expire at
        console.log(`profile`,this.profile);
        console.log(`idToken`, this.idToken);
        console.log(this.state.firstName);
        axios.get('http://localhost:5000/schools')
          .then(response => {
            // console.log(response.data.data.schools)
            this.setState({schoolData: response.data.data.schools})
          })
          .catch(err => console.log(err));
        this.expiresAt = authResult.idTokenPayload.exp * 1000;
        resolve();
      });
    });
    
  }

  logout() {
    
    this.idToken = null;
    this.profile = null;
    this.expiresAt = null;
  }
}

const auth = new Auth();

export default auth;
