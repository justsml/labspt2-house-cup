import React, { Component } from 'react';
import SideMenu from './SideMenu';


class SettingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: ''
        }
    }

    render() {
    return (
        <>
        <SideMenu />
        <div className='settings-page'>
            <div className='input-changes'>
                <div className='email-section'>
                    <span className='email-title' >Email: </span>
                    <input className='email-input'
                           placeholder='Log-in entered here..' />
                </div>
                <div className='old-password-section'>
                    <span className='old=password-title'>Old password: </span>
                    <input className='old-password-input'
                           placeholder='Enter here' />
                </div>
                <div className='new-password-input'>
                    <span className='new-password-title'>New password: </span>
                    <input className='new-pasword-input' placeholder='Enter here'></input>
                </div>
            </div>
            <button className='save-button'><b>Save</b></button>
        </div> 
        </> 
        );
    }
}

export default SettingsPage;
