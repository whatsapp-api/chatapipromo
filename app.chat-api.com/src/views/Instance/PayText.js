import React, {Component} from 'react';
import {Card, CardBody, CardHeader, FormGroup, Col, Row, Label, Input} from 'reactstrap';
import T from 'i18n-react';
import SendMessage from './SendMessage';

class PayText extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const {paidTill} = this.props;

        const paidTillDays = Math.round((paidTill - +new Date) / (60 * 60 * 24 * 1000));
        const fuckUpDays = paidTillDays * (-1);

        const paidTillDateObj = new Date(paidTill);

        const addZero = number => number >= 10 ? number : '0' + number;
        const paidTillDate = `${addZero(paidTillDateObj.getDate())}.${addZero(paidTillDateObj.getMonth()+1)}.${addZero(paidTillDateObj.getFullYear())} ${addZero(paidTillDateObj.getHours())}:${addZero(paidTillDateObj.getMinutes())}`;

        const fuckedUp = (+new Date) > paidTill;

        return (
            <div>
                {
                    T.translate(
                        'playground.' + (fuckedUp ? 'payFuckUp' : 'paySoon'),
                        {
                            context: {
                                paidTillDate, fuckUpDays, paidTillDays
                            }
                        })
                }
            </div>
        );
    }
}

export default PayText;
