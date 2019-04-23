import React from 'react';
import SideMenu from './SideMenu';
import axios from 'axios';

//import for react select
import Select from 'react-select';
import chroma from 'chroma-js';
import colorOptions from './ColorOptions';

class Houses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            incrementTicker: 0,
            houseList: [],
            name: '',
            color:'',
            pointTotal: ''
        }
    }

    componentDidMount() {
        // this.setState({
        //     houseList: this.props.houseList
        // });
        axios.get(`http://localhost:5000/schools/${this.props.match.params.id}/houses`)
        .then(response => { 
            this.setState({ 
                schoolsList: response.data 
            });
            console.log(response.data);
            console.log(this.props.houseList);
            
         })
        .catch(err => console.log(err))
    }

    //Add House
    addHouse = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/schools/${this.props.match.params.id}/houses`, {
            name: this.state.name,
            color: this.state.color,
            pointTotal: this.state.points
        });
        this.setState({
            name: '',
            color:'', 
            pointTotal: ''
        })
        console.log(`school ${this.state.newSchoolName} added!`);
    }
    //Handle-Input
    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
       })
    }
    //House point system
    pickTicker = e => {
        var activeNum = document.getElementsByClassName(`active-number`);
        if (activeNum.length > 0) {
            activeNum[0].classList.toggle('active-number');
        }
        e.target.classList.toggle('active-number');
        this.setState({
            incrementTicker: Number(e.target.id)
        })
    }

    addPoint = id => {
        let newPointTotal = this.state.houseList[id - 1].pointTotal + this.state.incrementTicker;
        this.setState((prevState) => {
            prevState.houseList[id - 1].pointTotal = newPointTotal;
        })
        var elements = document.getElementsByClassName(`active-number`);
        elements[0].classList.toggle('active-number');
        this.forceUpdate();
    };
    dropPoint = id => {
        let newPointTotal = this.state.houseList[id - 1].pointTotal - this.state.incrementTicker;
        this.setState((prevState) => {
            prevState.houseList[id - 1].pointTotal = newPointTotal;
        })
        var elements = document.getElementsByClassName(`active-number`);
        elements[0].classList.toggle('active-number');
        this.forceUpdate();
    };

    toggleFlip = id => {
        var element = document.getElementById(`housecard-${id}`);
        element.classList.toggle("flip");
    }

    //react select vars
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
    //color styles
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
            <div className='admin-main-page'>
                <SideMenu {...this.props} />
                <div className='housecard-container'>
                    <div className='newSchoolInputs'>
                        <h2>Add House</h2>
                        <form onSubmit={this.addHouse}>
                            <input type="text"
                                placeholder='name' 
                                name='name'
                                value={this.state.name}
                                    onChange={this.handleInput} />
                            <input type="text"
                                placeholder='points'
                                name='pointTotal' 
                                value={this.state.pointTotal}
                                onChange={this.handleInput} />
                            <input type="text"
                                placeholder='Color'
                                name='color' 
                                value={this.state.color}
                                onChange={this.handleInput} />    
                            {/* The following code needs to be checked-- Needs attention */}
                            {/* <Select
                                defaultValue={colorOptions[2]}
                                label="Single select"
                                name="color"
                                value={this.state.color}
                                options={colorOptions}
                                styles={this.colorStyles}
                            /> */}
                            <button type='submit'><b>+ Add House +</b></button>
                        </form>  
                    </div>
                    <div className='housecards'>
                        {this.state.houseList.map((eachHouse) => {
                            return (
                                
                                <div className='housecard'
                                     id={`housecard-${eachHouse.id}`}
                                     key={eachHouse.id}>  
                                    console.log(`house page line 132:`,{eachHouse});
                                    <div className='housecard-inner'>
                                        <div
                                            className='housecard-front'
                                            id={`housecard-front-${eachHouse.id}`}
                                            onClick={this.toggleFlip.bind(this, eachHouse.id)}

                                        >
                                            <h2 className='house-name'>{eachHouse.name}</h2>
                                            <h3 className='point-total'>{eachHouse.pointTotal}</h3>
                                            <h2 className='points-txt'>Points</h2>
                                        </div>
                                        <div className='housecard-back'>
                                            <div className='point-increment-area'>
                                                <span className='choose'>Choose Point</span>
                                                <div className='increment-number-container'>
                                                    <div className='row-1'>
                                                        <span className='increment-number' id='1' onClick={this.pickTicker.bind(this)}>1</span>
                                                        <span className='increment-number' id='2' onClick={this.pickTicker.bind(this)}>2</span>
                                                        <span className='increment-number' id='3' onClick={this.pickTicker.bind(this)}>3</span>
                                                        <span className='increment-number' id='4' onClick={this.pickTicker.bind(this)}>4</span>
                                                        <span className='increment-number' id='5' onClick={this.pickTicker.bind(this)}>5</span>
                                                    </div>
                                                    <div className='row-2'>
                                                        <span className='increment-number' id='6' onClick={this.pickTicker.bind(this)}>6</span>
                                                        <span className='increment-number' id='7' onClick={this.pickTicker.bind(this)}>7</span>
                                                        <span className='increment-number' id='8' onClick={this.pickTicker.bind(this)}>8</span>
                                                        <span className='increment-number' id='9' onClick={this.pickTicker.bind(this)}>9</span>
                                                        <span className='increment-number' id='10' onClick={this.pickTicker.bind(this)}>10</span>
                                                    </div>
                                                    <div className='increment-number-ticker'>
                                                        {/* <button className='down-ticker' onClick={this.incrementChangeDown}>↓</button> */}
                                                    </div>
                                                </div>
                                                <div className='points-button-container'>
                                                    <button className='add-points-button points-button' onClick={this.addPoint.bind(this, eachHouse.id)}>Add</button>
                                                    <button className='minus-points-button points-button' onClick={this.dropPoint.bind(this, eachHouse.id)}>Drop</button>
                                                </div>
                                            </div>
                                            <div className='text-area' onClick={this.toggleFlip.bind(this, eachHouse.id)}
                                            >
                                                <h3
                                                    className='point-total'
                                                >
                                                    {eachHouse.pointTotal}
                                                </h3>
                                                <h2 className='points-txt'>Points</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Houses;