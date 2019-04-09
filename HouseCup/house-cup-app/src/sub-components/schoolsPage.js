import React, { Component } from 'react';
import SideMenu from './sideMenu';
import schoolsTestData from '../mock data/schools';
import axios from 'axios';
import Select from 'react-select';
import chroma from 'chroma-js';
import colorOptions from './ColorOptions';

class SchoolsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolsList: [],
            houseList: [],
            newSchoolName: '',
            newSchoolCity: '',
        }
    }
    componentDidMount() {
        this.setState({
            schoolsList: schoolsTestData
        });
        // axios.get('')
    }
    handleSchoolInput = (e) => {
        // console.log([e.target.value]);
        this.setState({[e.target.name]: e.target.value})
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
                        {/* <form className="add-school-form">
                <div className='schools-page-container'>
                    <div className='add-school-container'>
                        <h2>Add New School</h2>
                        <form className="add-school-form">
                            <input
                                className="school-name"
                                type="text"
                                name="school"
                                // value={value}
                                // onChange={props.handleInput}
                                placeholder="School Name"
                            />
                            <button>Save</button>
                        </form>
                        <form className="add-House-form">
                            <input
                                className="house-name"
                                type="text"
                                name="house"
                                // value={value}
                                // onChange={props.handleInput}
                                placeholder="House Name"
                            />
                            <button>Save</button>
                        </form> */}
                        <div className='add-school-inputs'>
                            <input className='schoolName' placeholder='name' name='newSchoolName' onChange={this.handleSchoolInput}></input>
                            <input className='schoolCity' placeholder='city' name='newSchoolCity' onChange={this.handleSchoolInput}></input>
                            <button onClick={this.addSchool}><b>+ Add School +</b></button>
                        </div>
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