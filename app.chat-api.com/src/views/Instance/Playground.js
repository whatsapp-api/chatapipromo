import React, {Component} from 'react';
import {Card, CardBody, CardHeader, FormGroup, Col, Row, Label, Input} from 'reactstrap';
import T from 'i18n-react';
import SendMessage from './SendMessage';
import PayText from './PayText';
import {NavLink} from 'react-router-dom';


class Playground extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const {apiUrl, token, instanceId, paidTill} = this.props;
        const paid = paidTill > +new Date;

        return (
            <Row>
                {paid && <Col lg={6}>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-whatsapp"></i> WhatsApp #{instanceId}
                        </CardHeader>
                        <CardBody>
                            <div>{T.translate('playground.whatsNext')}</div>
                        </CardBody>
                    </Card>
                </Col>}
                <Col lg={6}>
                    <Card className={paid ? 'card-accent-success' : 'card-accent-danger'}>
                        <CardHeader>
                            <i className="fa fa-whatsapp"></i> WhatsApp #{instanceId}
                        </CardHeader>
                        <CardBody>
                            <PayText paidTill={paidTill}/>
                            <NavLink to="/pay">
                                <i className="fa fa-credit-card"></i> {T.translate('playground.payMore')}
                            </NavLink>
                        </CardBody>
                    </Card>
                </Col>
                {paid && <Col lg={6} md={12}>
                    <SendMessage apiUrl={apiUrl} token={token}/>
                </Col>}
                {paid && <Col lg={6} md={12}>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-history"></i>
                            {T.translate('playground.getMessagesExample')}
                        </CardHeader>
                        <CardBody>
                            <p>{T.translate('playground.getMessagesExplain')}</p>
                            <p>
                                {T.translate('playground.fromZero')}:<br/>
                                <a href={`${apiUrl}messages?token=${token}`} target="_blank">
                                    {`${apiUrl}messages?token=${token}`}
                                </a><br/>
                                {T.translate('playground.fromTen')}:<br/>
                                <a href={`${apiUrl}messages?token=${token}&lastMessageNumber=10`} target="_blank">
                                    {`${apiUrl}messages?token=${token}&lastMessageNumber=10`}
                                </a>
                            </p>
                            <div>
                                <i className="fa fa-book"></i> {T.translate('playground.moreInDocs')} <a
                                href={T.translate('playground.getMessagesDocs')} target="_blank">GET /messages</a>
                            </div>
                        </CardBody>
                    </Card>
                </Col>}
            </Row>
        );
    }
}

export default Playground;
