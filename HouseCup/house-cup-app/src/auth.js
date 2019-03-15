import auth0 from 'auth0-js';

export default class Auth {
    auth0 = new auth0.WebAuth({
       domain: "venky-yagatilee.auth0.com",
       clientID: "81ir02UDdeAaVWtecoDe3lux9Z0X3gB0",
       redirectUri: "http://localhost:3000/callback",
       audience: "http://venky-yagatilee.auth0.com/userinfo",
       responseType: "token id_token",
       scope: "openid"
     });
    

     login = () => {
       this.auth0.authorize();
     }

};