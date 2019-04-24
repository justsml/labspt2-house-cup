import auth0 from "auth0-js";
// Change callback URL based on where the app is hosted
let Development = `http://localhost:3000`;
let Production = `http://localhost:3000`;

class Auth {
  constructor() {
    this.authFlag = "isLoggedIn";

    this.auth0 = new auth0.WebAuth({
      domain: 'venky-yagatilee.auth0.com',
      audience: 'https://venky-yagatilee.auth0.com/userinfo',
      clientID: '46Ngw5RelPCvdaCoKrqPvIWyvgFQBqvx',
      redirectUri:
        (process.env.REACT_APP_CURR_ENV === "dev")
          ? `${Development}/callback`
          : `${Production}/callback`,
      responseType: "token id_token",
      scope: "openid email"
    });
  }

  login = () => {
    this.auth0.authorize();
  };
 
  getProfile = () => {
    return this.profile;
  }
  getIdToken = () => {
    return this.idToken;
  };

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.authResult = authResult;
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        console.log(`authResults: `,this.authResult);
        console.log(`idToken:`, this.idToken);
        console.log(`Profile:`, this.profile);
        this.setSession(authResult);
        resolve(authResult);
      });
    });
  };

  setSession = authResult => {
    // Set the time that the Access Token will expire at
    this.expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    //Save token returned by auth0 to auth
    this.idToken = authResult.idToken;
    //Set authFlag in local storage to true
    localStorage.setItem(this.authFlag, JSON.stringify(true));
  };

  logout = () => {
    //Set authFlag in local storage to false
    localStorage.setItem(this.authFlag, JSON.stringify(false));
    // this.auth0.logout({
    //   returnTo:
    //     process.env.REACT_APP_CURR_ENV === "dev" ? Development : Production,
    //     clientID: '46Ngw5RelPCvdaCoKrqPvIWyvgFQBqvx',
    // });
  };

  silentAuth = () => {
    if (this.isAuthenticated()) {
      return new Promise((resolve, reject) => {
        this.auth0.checkSession({}, (err, authResult) => {
          if (err) {
            localStorage.removeItem(this.authFlag);
            return reject(err);
          }
          this.setSession(authResult);
          resolve(authResult);
        });
      });
    }
  };

  isAuthenticated = () => {
    return JSON.parse(localStorage.getItem(this.authFlag));
  };
}

const auth = new Auth();
export default auth;
