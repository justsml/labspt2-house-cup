import React from 'react';
import {NavLink} from 'react-router-dom';

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

    render() {
        return (
            <div className='admin-main-page'>
                <NavLink to='/'><span className='sign-out'><u>Sign Out</u></span></NavLink>
                {/* side page component goes here  */}
                <div className='house-list'>
                    {this.props.houseList.map((eachHouse) => {
                        return (
                            <div className='each-house' key={eachHouse.number}>
                                <span><h5 className='house-number'>{eachHouse.number}</h5></span>
                                <h2 className='house-name'>{eachHouse.name}</h2>
                                <h3 className='point-total'>{this.state[eachHouse.name + eachHouse.pointTotal] || eachHouse.pointTotal}</h3>
                                <div className='point-increment-area'>
                                    <button className='add-points-button' name={eachHouse.name + eachHouse.pointTotal} onClick={this.confirmAddPoints}>+</button>
                                    <div className='add/minus-increment'>
                                        <span className='increment-number' >{this.state[eachHouse.name] || 0}</span>
                                        <div className='increment-number-ticker'>
                                            <button className='up-ticker' name={eachHouse.name} onClick={this.incrementChangeUp}>↑</button>
                                            <button className='down-ticker' name={eachHouse.name} onClick={this.incrementChangeDown}>↓</button>
                                        </div>
                                    </div>
                                    <button className='minus-points-button' name={eachHouse.name + eachHouse.pointTotal} onClick={this.confirmMinusPoints}>-</button>
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