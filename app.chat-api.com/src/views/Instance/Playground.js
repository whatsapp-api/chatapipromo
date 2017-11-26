import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Container, Col, Row} from 'reactstrap';
import T from 'i18n-react';

class Playground extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const {apiUrl,token, instanceId} = this.props;

        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-whatsapp"></i> WhatsApp #{instanceId}
                </CardHeader>
                <CardBody>
                    <Container fluid>
                        <Row>
                            <Col md="12" lg="6">
                                DEBUG: запросы
                            </Col>
                            <Col md="12" lg="6">
                                DEBUG: ответы
                            </Col>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
        );
    }
}

export default Playground;
