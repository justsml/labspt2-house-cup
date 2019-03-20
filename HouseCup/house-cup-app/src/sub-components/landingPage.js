import React from 'react';
import { NavLink } from 'react-router-dom';
import LandingImg from '../images/realestate.png';
import schoolsTestData from '../mock data/schools';


class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
<<<<<<< HEAD
                
=======
            schoolsList: [],
>>>>>>> 7c3e4f04c69f55ea13d7d3e4ddd2628f31f14d1e
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

    

    render() {
        // console.log(this.props.auth.login)
        return (
            <div className='landing-page'>
                <header className='landing-page-header'>
                    <div className="house-cup-title">House Cup Tracker</div>
                    <div className='button-container'>
                        <NavLink to='/signup' style={{ textDecoration: "none", color: "inherit" }}>
                            <button onClick={this.handleSubmit} className="button signup-button">Sign up</button>
                        </NavLink>
                        <NavLink to='/dashboard' style={{ textDecoration: "none", color: "inherit" }}>
                            <button onClick={this.handleSubmit} className="button login-button">Log in</button>
                        </NavLink>
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
                        <span>View your house scoreboard anytime, anywhere</span>
                    </div>
                    <div className='feature-2 feature'>
                        <span>Coordinate with all the teachers</span>
                    </div>
                    <div className='feature-3 feature'>
                        <span>Visual analysis at your fingertip</span>
                    </div>
                </div>
                <div className='landing-page-block landing-page-block-3'>
                    <h2>Check out the top-tier schools we work with</h2>
                    <div className='schools-list'>
                        {this.state.schoolsList.map((school) => {
                            return (
                                <h2>{school.name}</h2>
                            )
                        })}
                    </div>
                </div>
                <div className='landing-page-block landing-page-block-4'>
                    <div className='review-text'>
                        <h2>review review review</h2>
                    </div>
                    <div className='review-user'>
                        <h2>Professor Albus Dumbledore</h2>
                        <h3>Headmaster of Hogwarts. </h3>
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
<<<<<<< HEAD
                    <NavLink to='/dashboard'>
                    <button onClick={this.handleSubmit}
                            className="button login-button"
                           >Log in</button>
                    </NavLink>
                    <NavLink to='/signup'>
                    <button onClick={this.handleSubmit} className="button signup-button">Sign up</button>
                    </NavLink>                                  
                </div>
=======

                </div> */}
>>>>>>> 7c3e4f04c69f55ea13d7d3e4ddd2628f31f14d1e
            </div>
        )
    }
}

export default LandingPage;