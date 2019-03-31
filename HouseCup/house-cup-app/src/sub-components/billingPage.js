import React from 'react';
import Checkout from '../Checkout';

const billingPage = props => {
    return (
        <div className='billing-page'>
            {/* side page component goes here  */}
            <div className='payment-section'>
                <span className='payment-premium-ad'>
                    For {props.premiumPrice} upgrade to a <b>premium</b> account with unlimited Houses and historical analytics.
                </span>
                <div className='payment-info-box'>
                    <Checkout
                      name={'Historical Analytics'}
                      description={'House Cup'}
                      amount={19}
                    />
                </div>               
            </div>
        </div>
    )
}

export default billingPage;