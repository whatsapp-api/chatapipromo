//libs
import React, {Component} from 'react';
import {Row, Col, Card, CardBody, CardHeader} from 'reactstrap';
import T from 'i18n-react';
import ScanQR from './ScanQR';
import Playground from './Playground';
//modules
import instanceList from '../../database/instanceList';
import instanceAPI from '../../database/instanceAPI';

const MAX_INVALIDATIONS = 20;

class Instance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instances: {},
            instance: null,
            instanceStatuses: {},
            QRCodesInvalidated: 0,
        };
    }

    componentDidMount() {
        const self = this;
        console.debug('DEBUG: Instance.componentDidMount');
        instanceList.onChange(instanceObject => {
            console.debug(`DEBUG: componentDidMount onchange callback `, instanceObject);
            self.setState({
                instances: instanceObject,
            }, () => {
                self.loadData(this.props.match.params.id);
                self.loadStatuses();
            });
        });
    }

    loadStatuses() {
        const promises = Object.values(this.state.instances).map(({apiUrl, token, id}) => {
            if (this.state.instanceStatuses[id]) return;
            return this.loadStatus({apiUrl, token, id});
        });

        Promise.all(promises).then(() => this.startQRInvalidation());
    }

    loadStatus({apiUrl, token, id}) {
        console.log('Loading status for ' + apiUrl);
        if (this.state.instanceStatuses && this.state.instanceStatuses[id] && this.state.instanceStatuses[id].qrCode) {
            delete  this.state.instanceStatuses[id].qrCode;
            this.setState({instanceStatuses: this.state.instanceStatuses});
        }

        return instanceAPI.getStatus({apiUrl, token, useCache: false}).then(status => {
            const addState = {};
            addState[id] = status;
            const instanceStatuses = Object.assign({}, this.state.instanceStatuses, addState);
            this.setState({instanceStatuses: instanceStatuses});
        }).catch(e => {
            console.error('Error getting status ' + e, e);
        })
    }

    startQRInvalidation() {
        const state = this.state;
        const self = this;

        if (state.QRCodesInvalidated > MAX_INVALIDATIONS) {
            return;
        }
        this.setState({QRCodesInvalidated: state.QRCodesInvalidated + 1});

        setTimeout(() => {
            self.startQRInvalidation();

            if (!state.instance) return;

            const accountStatus = (state.instanceStatuses[state.instance.id] || {}).accountStatus;

            if (accountStatus !== 'loading' && accountStatus !== 'got qr code') return;
            const {apiUrl, token, id} = state.instance;
            this.loadStatus({apiUrl, token, id});
            console.log('QR code invalidation for #' + id);
        }, 30000);
    }

    loadData(id) {
        console.debug(`DEBUG: this.loadData(${id}) `, this.state);
        this.setState({
            instance: this.state.instances[id] || null,
        })
    }

    componentWillReceiveProps(nextProps) {
        this.loadData(nextProps.match.params.id);
    }

    cardMessage(text) {
        return (
            <Card>
                <CardBody>
                    <div>{text}</div>
                </CardBody>
            </Card>
        );
    }

    render() {
        const {instance} = this.state;
        if (!instance) {
            return <div className="animated fadeIn padTop">
                {T.translate('instanceCard.loadingInstances')}
            </div>
        }

        let accountStatus = (this.state.instanceStatuses[instance.id] || {}).accountStatus;
        const qrCode = (this.state.instanceStatuses[instance.id] || {}).qrCode || null;
        if (accountStatus !== 'loading' && accountStatus !== 'got qr code' && accountStatus !== 'authenticated') {
            accountStatus = 'unknown';
        }

        return (
            <div className="animated fadeIn padTop">
                {accountStatus === 'got qr code' &&
                <ScanQR qrCode={qrCode} instanceId={instance.id}/>
                }
                {accountStatus === 'unknown' &&
                this.cardMessage(T.translate('instanceCard.loadingServer'))
                }
                {accountStatus === 'loading' &&
                this.cardMessage(T.translate('instanceCard.statusLoading'))
                }
                {accountStatus === 'authenticated' &&
                <Playground apiUrl={instance.apiUrl} token={instance.token} instanceId={instance.id}
                            paidTill={instance.paidTill}/>
                }
                <Row>
                    <Col sm="12" md="6">
                        <pre>{JSON.stringify(this.props, null, 2)}</pre>
                    </Col>
                    <Col sm="12" md="6">
                        <pre>{JSON.stringify(this.state, null, 2)}</pre>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Instance;
