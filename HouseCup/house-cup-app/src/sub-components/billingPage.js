import React from 'react';

const billingPage = props => {
    return (
        <div className='billing-page'>
            {/* side page component goes here  */}
            <div className='payment-section'>
                <span className='payment-premium-ad'>
                    For {props.premiumPrice} upgrade to a <b>premium</b> account with unlimited Houses and historical analytics.
                </span>
                <div className='payment-info-box'>
                    <div className='payment-inputs'>
                        <input className='CC#'></input>
                        <input className='Expiration-date'></input>
                        <input className='CVV'></input>
                    </div>
                    <button className='upgrade-button'>Upgrade Now!</button>
                </div>
            </div>
        </div>
    )
}

export default billingPage;