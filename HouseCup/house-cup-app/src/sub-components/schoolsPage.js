import React, { Component } from 'react';
import SideMenu from './sideMenu';
import schoolsTestData from '../mock data/schools';
import axios from 'axios';
import Select from 'react-select';
import chroma from 'chroma-js';
import colorOptions from './ColorOptions';
import auth from '../auth.js';

class SchoolsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolsList: [],
            authProfile: [],
            authPassword: '',
            newSchoolName: '',
            newSchoolCity: '',
        }
    }
    componentDidMount() {
        // this.setState({
        //     schoolsList: schoolsTestData
        // });
        // auth.getProfile();
        this.setState({
            authProfile: auth.getProfile()
        });
        this.setState({
            authPassword: auth.getIdToken()
        });
        console.log(this.props.match.params);
        const userID = this.state.authProfile.email;
        this.fetchUser(userID);
    }
    fetchUser = id => {
        axios.get(`http://localhost:5000/users/${id}`)
            .then(response => {
                console.log('success!', response);
                this.setState({
                })
            })
            .catch(err => {
                console.log('error!', err);
                console.error(err);
            })
    }
    handleSchoolInput = (e) => {
        // console.log([e.target.value]);
        this.setState({[e.target.name]: e.target.value})
    }
    addSchool = e => {
        axios.post('http://localhost:5000/users/register', {
            email: this.state.authProfile.email,
            password: this.state.authPassword,
        })
            .then(response => {
                console.log(response);
                // this.setState({
                //     schoolsList: response.data.data
                // })
            })
    }



    dot = (color = '#ccc') => ({
        alignItems: 'center',
        display: 'flex',

        ':before': {
            backgroundColor: color,
            borderRadius: 10,
            content: '" "',
            display: 'block',
            marginRight: 8,
            height: 10,
            width: 10,
        },
    });

    colorStyles = {
        control: styles => ({ ...styles, backgroundColor: 'white' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? null
                    : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black'
                        : data.color,
                cursor: isDisabled ? 'not-allowed' : 'default',
            };
        },
        input: styles => ({ ...styles, ...this.dot() }),
        placeholder: styles => ({ ...styles, ...this.dot() }),
        singleValue: (styles, { data }) => ({ ...styles, ...this.dot(data.color) }),
    };

    render() {
        return (
            <div className='schools-page'>
                <SideMenu {...this.props} />
                <div className='schools-container'>
                    <div className='add-school-container'>
                        <h2>Add New School:</h2>
                        <div className='add-school-inputs'>
                            <input className='schoolName' placeholder='name' name='newSchoolName' onChange={this.handleSchoolInput}></input>
                            <input className='schoolCity' placeholder='city' name='newSchoolCity' onChange={this.handleSchoolInput}></input>
                            <button onClick={this.addSchool}><b>+ Add School +</b></button>
                        </div>
                            {/* had too temporarily comment out lines 81-87 for Sprint fufillment 4/7/19. */}
                            {/* @Louis what is this for?? */}
                            {/* <Select
                                defaultValue={colorOptions[2]}
                                label="Single select"
                                options={colorOptions}
                                styles={this.colorStyles}
                            />
                            <button>Save</button> */}
                    </div>
                    <div className='schools-list'>
                        {this.state.schoolsList.map((school) => {
                            return (
                                <div className='school-card'>
                                    <h2 className='school-name'>{school.name}</h2>
                                    <div className='house-list'>{school.houses.map((house) => {
                                        return (
                                            <h3 className='house'>{house}</h3>
                                        )
                                    })}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default SchoolsPage;