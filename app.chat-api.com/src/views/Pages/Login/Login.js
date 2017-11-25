import React, {Component} from 'react';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';
import T from 'i18n-react';

class Login extends Component {
    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <h1><T.span text={{key: "auth"}}/></h1>
                                        <p className="text-muted"><T.span text={{key: "onlyGoogle"}}/></p>
                                        <Row>
                                            <Col xs="4">
                                                <Button color="primary" className="px-4">
                                                    <T.span text={{key: "loginWithGoogle"}}/>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{width: 44 + '%'}}>
                                    <CardBody className="text-center">
                                        <div>
                                            <h2><T.span text={{key: "register"}}/></h2>
                                            <p><T.span text={{key: "registerText"}}/></p>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Login;
