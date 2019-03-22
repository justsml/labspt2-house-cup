import React, { Component } from 'react';
import schoolsTestData from '../mock data/schools';
import SideMenu from './sideMenu';
import Select from 'react-select';

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

    colorOptions = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    render() {
        return (
            <div className='schools-page'>
                <SideMenu />
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
                            <Select options={this.colorOptions} />

                            <button>Save</button>
                        </form>
                    </div>
                    <div className='schools-list'>
                        {this.state.schoolsList.map((school) => {
                            return (
                                <div>
                                    <h2>{school.name}</h2>
                                    <div>{school.houses.map((house) => {
                                        return (
                                            <h3>{house}</h3>
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