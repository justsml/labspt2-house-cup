import React, { Component } from 'react';
import schoolsTestData from '../mock data/schools';
import SideMenu from './sideMenu';

class SchoolsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolsList: [],
            houseList: []
        }
    }
    componentDidMount() {
        this.setState({
            schoolsList: schoolsTestData
        })
    }

    render() {
        return (
            <div className='schools-page'>
                <SideMenu />
                <div className='add-school-container'>
                    <h2>Add New School</h2>
                    <form className="add-school-form">
                        <input
                            className="school-name"
                            type="text"
                            name="name"
                            // value={value}
                            // onChange={props.handleInput}
                            placeholder="School Name"
                        />
                        <button>Save</button>
                    </form>
                </div>
                <div className='schools-list'>
                    {this.state.schoolsList.map((school) => {
                        return (
                            <h2>{school.name}</h2>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default SchoolsPage;