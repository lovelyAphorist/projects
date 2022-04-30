import React from 'react';
import * as checkoutService from '../../services/checkoutService';
import debug from 'sabio-debug';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
    'pk_test_51KnVp3EJ4Jxn1WzS58aj4NI1mjo1ShxCHCW9fOOQOs9QDWLTc47vi2Z5I2ifKdoEx8yltHyk15wotEuGlNRnECj100u5RgjGIj'
);
function Checkout() {
    const _logger = debug.extend('Checkout');

    const onClick = (e) => {
        let data = {};
        let productId = e.target.getAttribute('id');
        data.priceId = productId;
        _logger(data);
        checkoutService.createCheckout(data).then(onCreateCheckoutSuccess).catch(onCreateCheckoutFail);
    };

    const onCreateCheckoutSuccess = async (response) => {
        _logger('--success--', response);
        const stripe = await stripePromise;
        const sessionId = response.sessionId;
        let result = stripe.redirectToCheckout({ sessionId: sessionId });
        if (result.error) {
            _logger(result.error.message);
        }
    };
    const onCreateCheckoutFail = (response) => {
        _logger('--Fail--', response);
    };

    return (
        <React.Fragment>
            <form>
                <button
                    outline
                    type="submit"
                    id="price_1KsUI3EJ4Jxn1WzS7pOQxeMB"
                    className="btn btn-danger btn-sm rounded border border-danger shadow"
                    onClick={onClick}>
                    Add To cart
                </button>
            </form>
        </React.Fragment>
    );
}
export default Checkout;
