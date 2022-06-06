import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import Pagination from 'rc-pagination';
import debug from 'sabio-debug';
import * as subscriberService from '../../services/subscriberService';
import SubscriberCard from './SubscribersCard';
import 'rc-pagination/assets/index.css';
import locale from 'rc-pagination/lib/locale/en_US';
import './style.css';

const _logger = debug.extend('Subscribers');

function Subscribers() {
    const [subscriber, setSubscriber] = useState({
        subscriberArray: [],
        subscriberArrayComponent: [],
        currentPage: 1,
        pageIndex: 0,
        pageSize: 5,
        totalCount: 0,
        query: '',
    });
    useEffect(() => {
        subscriberService.getSubscriber(0, subscriber.pageSize).then(onSubscriberSuccess).catch(onSubscriberError);
    }, []);
    const onSubscriberSuccess = (response) => {
        let index = response.data.item.pageIndex;
        let pSize = response.data.item.pageSize;
        let totalCount = response.data.item.totalCount;
        let arrayOfSubscribers = response.data.item.pagedItems;
        _logger(arrayOfSubscribers);
        setSubscriber((prevState) => {
            const subscriberData = { ...prevState };
            subscriberData.subscriberArray = arrayOfSubscribers;
            subscriberData.pageIndex = index;
            subscriberData.pageSize = pSize;
            subscriberData.totalCount = totalCount;
            subscriberData.subscriberArrayComponent = arrayOfSubscribers.map(mapSubscribers);
            return subscriberData;
        });
    };
    _logger(subscriber);
    const onSubscriberError = (err) => {
        _logger(err);
    };

    const mapSubscribers = (aSubscriber) => {
        return <SubscriberCard subscriber={aSubscriber} key={'id' + aSubscriber.id} hasUser={false} />;
    };

    const onPaginationChange = (page) => {
        _logger(page);
        setSubscriber((prevState) => {
            let subscriberData = { ...prevState };
            subscriberData.currentPage = page;
            return subscriberData;
        });
        subscriberService
            .getSubscriber(page - 1, subscriber.pageSize)
            .then(onSubscriberSuccess)
            .catch(onSubscriberError);
    };

    const onClickViewAll = () => {
        setSubscriber((prevState) => {
            let emptySubscriberId = { ...prevState };
            emptySubscriberId.id = '';
            return emptySubscriberId;
        });
        setSubscriber((prevState) => {
            let emptyQuery = { ...prevState };
            emptyQuery.query = '';
            return emptyQuery;
        });
        subscriberService.getSubscriber(0, subscriber.pageSize).then(onSubscriberSuccess).catch(onSubscriberError);
    };

    return (
        <Row className=" mx-auto ">
            <div className="page-title-box">
                <div className="page-title-right">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item">
                                <a href="/">Interrogas</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="/">Admin</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Subscribers
                            </li>
                        </ol>
                    </nav>
                </div>
                <h4 className="page-title">Subscribers</h4>
            </div>
            <Card className="survey-card-length">
                <Card.Body>
                    <Row className="mb-2"></Row>
                    <Table hover="true" className="survey-table-height">
                        <thead className="table-light">
                            <tr role="row">
                                <th>User Id</th>
                                <th>User Email</th>
                                <th>Stripe Customer ID</th>
                                <th>Subscription Type</th>
                                <th>Subscription End</th>
                            </tr>
                        </thead>
                        <tbody>{subscriber.subscriberArrayComponent}</tbody>
                    </Table>
                    <Row>
                        <Pagination
                            className="pagination pagination-rounded survey-width-auto-change"
                            current={subscriber.currentPage}
                            pageSize={subscriber.pageSize}
                            total={subscriber.totalCount}
                            onChange={onPaginationChange}
                            locale={locale}
                        />
                        <Col>
                            <button type="button" onClick={onClickViewAll} className="btn btn-sm btn-success">
                                View All
                            </button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Row>
    );
}
export default Subscribers;
