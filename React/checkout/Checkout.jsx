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
        checkoutService.createCheckoutSingle(data).then(onCreateCheckoutSuccess).catch(onCreateCheckoutFail);
    };
    const onClickSub = (e) => {
        let data = {};
        let productId = e.target.getAttribute('id');
        data.priceId = productId;
        _logger(data);
        checkoutService.createCheckoutSub(data).then(onCreateCheckoutSuccess).catch(onCreateCheckoutFail);
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
            <div className="container my-5 mx-auto">
                <h3 className="mx-5 my-4">Purchase subscription</h3>
                <form>
                    <div className="row mx-auto">
                        <div className="card col-md-3 mx-4 py-2">
                            <div className="card-body">
                                <h5 className="card-title">One Time Purchase</h5>
                                <p className="card-text">Gets you acccess to surveys $79.99</p>
                                <button
                                    outline
                                    type="submit"
                                    id="price_1KsUI3EJ4Jxn1WzS7pOQxeMB"
                                    className="btn btn-danger btn-sm rounded border border-danger shadow"
                                    onClick={onClick}>
                                    Purchase
                                </button>
                            </div>
                        </div>
                        <div className="card col-md-3 mx-4 py-2">
                            <div className="card-body">
                                <h5 className="card-title">One Month Subscription</h5>
                                <p className="card-text">$14.99</p>
                                <button
                                    outline
                                    type="submit"
                                    id="price_1Kv0jSEJ4Jxn1WzSAIg82nDs"
                                    className="btn btn-danger btn-sm rounded border border-danger shadow"
                                    onClick={onClickSub}>
                                    Purchase
                                </button>
                            </div>
                        </div>
                        <div className="card col-md-3 mx-4 py-2">
                            <div className="card-body">
                                <h5 className="card-title">One Year Subscription</h5>
                                <p className="card-text">$129.99</p>
                                <button
                                    outline
                                    type="submit"
                                    id="price_1Kv0p5EJ4Jxn1WzS7QWqkaYe"
                                    className="btn btn-danger btn-sm rounded border border-danger shadow"
                                    onClick={onClickSub}>
                                    One Year Subscription
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
}
export default Checkout;
