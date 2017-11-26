import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Container, Col, Row} from 'reactstrap';
import T from 'i18n-react';

class ScanQR extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const {qrCode, instanceId} = this.props;

        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-whatsapp"></i> WhatsApp #{instanceId}
                </CardHeader>
                <CardBody>
                    <Container fluid>
                        <Row>
                            <Col md="12" lg="4">
                                {T.translate('instanceCard.authInstruction')}
                            </Col>
                            <Col md="12" lg="4" className="text-center">
                                <img src={qrCode} alt="QR" className="img-fluid rounded"/>
                                <p>{T.translate('instanceCard.scanIt')}</p>
                            </Col>
                            <Col md="12" lg="4" className="text-center">
                                <img src="/img/whatsapp_auth_ru.gif" className="img-fluid rounded"/>
                            </Col>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
        );
    }
}

export default ScanQR;
