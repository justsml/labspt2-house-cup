import React from 'react';
// import { NavLink } from 'react-router-dom';
import SideMenu from './sideMenu';

class AdminMainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    incrementChangeUp = e => {
        const specificHouse = e.target.name;
        const previousValue = e.target.parentNode.parentNode.children[0].innerHTML;
        this.setState({[specificHouse]: +previousValue + +1});
    };
    incrementChangeDown = e => {
        const specificHouse = e.target.name;
        const previousValue = e.target.parentNode.parentNode.children[0].innerHTML;
        console.log(specificHouse);
        console.log(previousValue);
        this.setState({[specificHouse]: +previousValue - +1});
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
        var element = document.getElementById(id);
        element.classList.toggle("flip");
    }

    render() {
        return (
            <div className='admin-main-page'>
                <SideMenu />
                <div className='housecard-container'>
                    {this.props.houseList.map((eachHouse) => {
                        return (
                            <div
                                className='housecard'
                                id={eachHouse.id}
                                key={eachHouse.id}
                                onClick={this.toggleFlip.bind(this, eachHouse.id)}
                            >
                                <div className='housecard-inner'>
                                    <div className='housecard-front'>
                                        {/* <span><h5 className='house-number'>{eachHouse.number}</h5></span> */}
                                        <h2 className='house-name'>{eachHouse.name}</h2>
                                        <h3 className='point-total'>{eachHouse.pointTotal}</h3>
                                    </div>
                                    <div className='housecard-back'>
                                        <div className='point-increment-area'>
                                            <button className='add-points-button' onClick={this.props.confirmAddPoints}>+</button>
                                            <div className='add/minus-increment'>
                                                <span className='increment-number'>{this.state.incrementTicker}</span>
                                                <div className='increment-number-ticker'>
                                                    <button className='up-ticker' onClick={this.incrementChangeUp}>↑</button>
                                                    <button className='down-ticker' onClick={this.incrementChangeDown}>↓</button>
                                                </div>
                                            </div>
                                            <button className='minus-points-button' onClick={this.props.confirmMinusPoints}>-</button>
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