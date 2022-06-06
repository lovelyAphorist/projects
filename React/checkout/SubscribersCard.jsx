import React from 'react';

import PropTypes from 'prop-types';

function SubscriberCard(props) {
    const aSubscriber = props.subscriber;

    return (
        <tr>
            <td>{aSubscriber.id}</td>
            <td>{aSubscriber.email}</td>
            <td>{aSubscriber.stripeCustomerId}</td>
            <td>{aSubscriber.subscriptionType}</td>
            <td>{aSubscriber.subscriptionEnd}</td>
        </tr>
    );
}
SubscriberCard.propTypes = {
    subscriber: PropTypes.shape({
        id: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        stripeCustomerId: PropTypes.string,
        subscriptionType: PropTypes.string,
        subscriptionEnd: PropTypes.string.isRequired,
    }),
    hasUser: PropTypes.bool,
};
SubscriberCard.defaultProps = {
    hasUser: true,
};
export default SubscriberCard;
