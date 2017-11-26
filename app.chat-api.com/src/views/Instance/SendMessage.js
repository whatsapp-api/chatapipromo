import React, {Component} from 'react';
import {Card, CardBody, CardHeader, FormGroup, Col, Row, Label, Input, Button} from 'reactstrap';
import T from 'i18n-react';
import fetch from '../../utils/fetch';

class Playground extends Component {
    constructor(props) {
        super(props);
        this.state = {
            receiver: '79995253422',
            text: T.translate('playground.dummyText'),
            receiverFormatIsOk: true,
            textFormatIsOk: true,
            response: null,
            sent: false,
        };
        this.receiverChanged = this.receiverChanged.bind(this);
        this.textChanged = this.textChanged.bind(this);
        this.send = this.send.bind(this);
    }

    receiverChanged(event) {
        const receiver = event.target.value.replace(/\D/g, '');
        this.setState({
            receiver,
            receiverFormatIsOk: receiver.length === 11 && receiver[0] === '7'
        });
    }

    textChanged(event) {
        const text = event.target.value.substr(0, 100);
        this.setState({
            text,
            textFormatIsOk: text.length > 0
        });
    }

    send() {
        const {apiUrl, token} = this.props;
        const {receiver, text} = this.state;
        this.setState({sent: true});
        fetch(`${apiUrl}message?token=${token}`, 'POST', {
            "phone": receiver,
            "body": text
        }).then(response => {
            this.setState({response});
        }).catch(e => {
            this.setState({response: 'Error'});
            console.log(`Error fetching ${apiUrl}message?token=${token}` + e, e);
        })
    }

    render() {
        const {receiverFormatIsOk, receiver, textFormatIsOk, text, sent, response} = this.state;
        const {apiUrl, token} = this.props;
        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-send-o"></i> {T.translate('playground.sendMessageExample')}
                </CardHeader>
                <CardBody>
                    <FormGroup>
                        <Label htmlFor="receiver">{T.translate('playground.receiver')}</Label>
                        <Input type="text" id="receiver" value={receiver}
                               onChange={this.receiverChanged}
                               className={receiverFormatIsOk ? '' : 'is-invalid'} disabled={sent}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="text">{T.translate('playground.text')}</Label>
                        <Input type="textarea" id="text" value={text}
                               onChange={this.textChanged}
                               className={textFormatIsOk ? '' : 'is-invalid'} disabled={sent}/>
                    </FormGroup>
                    {
                        receiverFormatIsOk && textFormatIsOk && (
                            <div>
                                <p>{T.translate('playground.requestToSend')}:</p>
                                <pre>POST {apiUrl}message?token={token}{"\n"}{"\n"}
                                    JSON body: {"\n"}
                                    {JSON.stringify({
                                        "phone": receiver,
                                        "body": text
                                    }, null, 2)}</pre>
                            </div>
                        )
                    }
                    <FormGroup className="form-actions">
                        <Button type="submit" color="primary" disabled={sent || !receiverFormatIsOk || !textFormatIsOk}
                                onClick={this.send}>
                            {T.translate('playground.send')}
                        </Button>
                    </FormGroup>
                    {
                        sent && !response && T.translate('loading')
                    }
                    {
                        response && (
                            <div>
                                <p>{T.translate('playground.gotResponse')}:</p>
                                <pre>{JSON.stringify(response, null, 2)}</pre>
                                <p>{T.translate('playground.checkOnPhone')}</p>
                            </div>
                        )
                    }
                    <div>
                        <i className="fa fa-book"></i> {T.translate('playground.moreInDocs')} <a
                        href={T.translate('playground.sendMessagesDocs')} target="_blank">POST /message</a>
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default Playground;
