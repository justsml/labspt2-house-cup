import React from 'react';
// import { NavLink } from 'react-router-dom';
import SideMenu from './sideMenu';

class AdminMainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            incrementTicker: 0,
            houseList: []
        }
    }
    componentDidMount() {
        this.setState({
            houseList: this.props.houseList
        })
    }
    pickTicker = e => {
        // console.log(e.target.id);
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
    confirmAddPoints = e => {
        var valueAdded = e.target.parentNode.children[1].children[0].innerHTML;
        const test = e.target.name;
        console.log(test);
        console.log(valueAdded);
        var currentValue = e.target.parentNode.parentNode.children[2].innerHTML;
        this.setState({[test]: +currentValue + +valueAdded});
    };
    confirmMinusPoints = e => {
        var valueSubtracted = e.target.parentNode.children[1].children[0].innerHTML;
        const test = e.target.name;
        var currentValue = e.target.parentNode.parentNode.children[2].innerHTML;
        this.setState({[test]: +currentValue - +valueSubtracted});
    }

    toggleFlip = id => {
        var element = document.getElementById(`housecard-${id}`);
        element.classList.toggle("flip");
    }

    render() {
        return (
            <div className='admin-main-page'>
                <SideMenu />
                <div className='housecard-container'>
                    {this.state.houseList.map((eachHouse) => {
                        // console.log(this.state);
                        // console.log(this.state.houseList[eachHouse.id-1]);
                        return (
                            <div
                                className='housecard'
                                id={`housecard-${eachHouse.id}`}
                                key={eachHouse.id}
                            // onClick={this.toggleFlip.bind(this, eachHouse.id)}
                            >
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
                                                    {/* <button className='up-ticker' onClick={this.incrementChangeUp}>↑</button> */}
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
        )
    }
}

export default AdminMainPage;