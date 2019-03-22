import React from 'react';
import LandingImg from '../images/realestate.png';
import Dumbledore from '../images/dumbledore.jpg';
import { ReactComponent as IconPhone } from '../images/icon-phone.svg';
import { ReactComponent as IconChart } from '../images/icon-chart.svg';
import { ReactComponent as IconTeacher } from '../images/icon-teacher.svg';

import schoolsTestData from '../mock data/schools';
import auth from '../Auth';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            schoolsList: [],
        };
    }

    componentDidMount() {
        this.setState({
            schoolsList: schoolsTestData
        })
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

    signOut = () => {
        auth.logout();
        this.props.history.replace('/');
  }

    render() {
        return (
            <div className='landing-page'>
                <header className='landing-page-header'>
                    <div className="house-cup-title">House Cup Tracker</div>
                    <div className='button-container'>

                        {
                            !auth.isAuthenticated() &&
                            <button onClick={auth.login}
                                className="button login-button">Sign Up/Log In</button>
                        }
                        {
                            auth.isAuthenticated() &&
                            <div>
                                <label className="mr-2 text-white">{auth.getProfile().name}</label>
                                <button
                                    className="button logout-button"
                                    onClick={() => { this.signOut() }}>
                                    Sign Out
                                </button>
                            </div>
                        }

                    </div>
                </header>
                <div className='landing-page-block landing-page-block-1'>
                    <div className='jumbo-container'>
                        <h2 className="jumbo-1">FOR YOUR SCHOOL</h2>
                        <h1 className="jumbo-title">LET THE HOUSE CUP BEGIN</h1>
                    </div>
                    <img src={LandingImg} alt="loginImg" className="landing-img" />
                </div>
                <div className='landing-page-block landing-page-block-2'>
                    <div className='feature-1 feature'>
                        <IconPhone className='icon' />
                        {/* <svg src={IconPhone} alt="dumbledore" className="icon icon-phone" /> */}
                        <span className='feature-txt'>View your house scoreboard anytime, anywhere</span>
                    </div>
                    <div className='feature-2 feature'>
                        <IconTeacher className='icon' />
                        <span className='feature-txt'>Coordinate with all the teachers</span>
                    </div>
                    <div className='feature-3 feature'>
                        <IconChart className='icon' />
                        <span className='feature-txt'>Visual analysis at your fingertip</span>
                    </div>
                </div>
                <div className='landing-page-block landing-page-block-3'>
                    <h2 className='checkout'>Check out the top-tier schools we work with</h2>
                    <div className='schools-list'>
                        {this.state.schoolsList.map((school) => {
                            return (
                                <h2 className='school'>{school.name}</h2>
                            )
                        })}
                    </div>
                </div>
                <div className='landing-page-block landing-page-block-4'>
                    <div className='review-container'>
                        <div className='review-text'>
                            <h2 className='slogan'>This is the real magic!</h2>
                            <h4 className="text">"Managing Hogwarts has never been so easy for me. Sometimes technology can be more powerful than magic, and House Cup Tracker is the best example!"</h4>
                        </div>
                        <div className='review-user'>
                            <img src={Dumbledore} alt="dumbledore" className="dumbledore-img" />
                            <h2 className='dumbledore-name'>Professor Albus Dumbledore</h2>
                            <h3 className='dumbledore-title'>Headmaster of Hogwarts. </h3>
                        </div>
                    </div>
                </div>


                {/* <div className="login-box">
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

                </div> */}
            </div>
        )
    }
}

export default LandingPage;