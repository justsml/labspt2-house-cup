import React, { Component } from 'react';
import SideMenu from '../SideMenu';
import Modal from './Modal.js';
import '../../App.css';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class SettingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
      }

getInitialState = () => {
		return { mounted: false };
	}
	
componentDidMount () {
		this.setState({ mounted: true });
	}
	
handleSubmit = (e) => {
       e.preventDefault();
		this.setState({ mounted: false });
		
}

render() {
		let child;

		if(this.state.mounted) {
			child = (<Modal onSubmit={this.handleSubmit} />);
		}
		
		return(
            <>
            <SideMenu />
			<div className="settings">
				<ReactCSSTransitionGroup 
					transitionName="example"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}>
						{child}
				</ReactCSSTransitionGroup>
			</div>
            </>
		);
	}
}

export default SettingsPage;
