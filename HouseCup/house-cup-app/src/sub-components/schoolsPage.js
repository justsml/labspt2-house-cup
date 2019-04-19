import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";
//components
import SideMenu from './SideMenu';

//testdata; delete later
import schoolsTestData from '../mock data/schools';

class SchoolsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolsList: [],
            houseList: [],
            newSchoolName: '',
            newSchoolCity: '',
            newSchoolDescription: '',
        }
    }
    componentDidMount() {
        this.setState({
            schoolsList: schoolsTestData
        });
        axios.get('http://localhost:5000/schools')
            .then(response => { 
                this.setState({ schoolsList: response.data.data.schools })
                console.log(this.state.schoolsList);
             })
            .catch(err => console.log(err))
        // this.props.getId(this.state)    
    }

    addSchool = (e) => {
        axios.post('http://localhost:5000/schools', {
            name: this.state.newSchoolName,
            city: this.state.newSchoolCity,
            userId: this.state.newSchoolUserID
        });
        console.log(`school ${this.state.newSchoolName} added!`);
    }

    handleSchoolInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

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
                            <input className='schoolDescription' placeholder='description' name='newSchoolDescription' onChange={this.handleSchoolInput}></input>
                            <button onClick={this.addSchool}><b>+ Add School +</b></button>
                        </div>
                    </div>
                    <div className='schools-list'>
                        {this.state.schoolsList.map((school) => {
                            return (
                                <div className='school-card'>
                                    <NavLink  to={`/admin/schools/${school.id}`} className='menu-button' activeClassName="activeMenu" style={{ textDecoration: "none", color: "inherit" }}>
                                        <h2 className='school-name'>{school.name}</h2>
                                        <h4 className='school-name'>{school.city}</h4>
                                    </NavLink>
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