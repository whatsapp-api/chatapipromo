//libs
import React, {Component} from 'react';
import {Row, Col, Card, CardBody, CardHeader} from 'reactstrap';
import T from 'i18n-react';
//modules
import PayText from '../Instance/PayText';
import instanceList from '../../database/instanceList';
import instanceAPI from '../../database/instanceAPI';


class Instance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instances: {},
        };
    }

    componentDidMount() {
        const self = this;
        console.debug('DEBUG: Instance.componentDidMount');
        instanceList.onChange(instanceObject => {
            console.debug(`DEBUG: componentDidMount onchange callback `, instanceObject);
            self.setState({instances: instanceObject});
        });
    }

    render() {
        return (
            <div className="animated fadeIn padTop">
                <Row>

                    {
                        Object.values(this.state.instances).map(instance => (
                            <Col lg={6}>
                                <Card
                                    className={instance.paidTill > +new Date ? 'card-accent-success' : 'card-accent-danger'}>
                                    <CardHeader>
                                        <i className="fa fa-whatsapp"></i> WhatsApp #{instance.id}
                                    </CardHeader>
                                    <CardBody>
                                        <PayText paidTill={instance.paidTill}/>
                                    </CardBody>
                                </Card>
                            </Col>git
                        ))
                    }

                </Row>
            </div>
        )
    }
}

export default Instance;
