import React from 'react';
import {NavLink} from 'react-router-dom';
import LandingImg from '../images/realestate.png'

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        localStorage.setItem('username', this.state.username)
        window.location.reload();
    }

    render() {
        return (
            <div className='landing-page'>
                <img src={LandingImg} alt="loginImg" className="landing-img" />
                <div className="login-box">
                    <p className="title">House Cup Tracker</p>
                    <form onSubmit={this.handleSubmit} className="loginInput">
                        <input
                            type="text"
                            name="username"
                            placeholder="Phone number, username or email"
                            value={this.state.username}
                            onChange={this.handleInput}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleInput}
                        />
                    </form>
                    <NavLink to='/admin'>
                    <button onClick={this.handleSubmit} className="button login-button">Log in</button>
                    </NavLink>
                    <NavLink to='/signup'>
                    <button onClick={this.handleSubmit} className="button signup-button">Sign up</button>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default LandingPage;