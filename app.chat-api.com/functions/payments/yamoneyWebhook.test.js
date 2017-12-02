"use strict";
jest.mock('../components/extendPayment.js');
jest.mock('../registration/sendTelegramNotification.js');
//libs
const assert = require('chai').assert;
//modules
const yamoneyWebhook = require('./yamoneyWebhook');
const extendPayment = require('../components/extendPayment');
const sendTelegramNotification = require('../registration/sendTelegramNotification');
//init

describe('Yandex Money card webhook', () => {
    beforeEach(() => {
        extendPayment.mockClear();
        sendTelegramNotification.mockClear();
    });
    it('should call extendPayment for 1 month', done => {
        yamoneyWebhook({
            body: {
                label: 'WA151_1M',
                withdraw_amount: '900',
            }
        }).then(response => {
            const calls = extendPayment.mock.calls;
            assert.strictEqual(1, calls.length, response);
            assert.strictEqual(30, calls[0][0].days);
            assert.strictEqual(151, calls[0][0].accountNumber);
            assert(calls[0][0].paymentTs < +new Date && calls[0][0].paymentTs > +new Date - 1000);
            assert.strictEqual('Yandex.Money - card', calls[0][0].method);
            assert.strictEqual(900, calls[0][0].summ);
            assert.strictEqual(1, sendTelegramNotification.mock.calls.length);
            done();
        })
    });
    it('should call extendPayment for 2191 month', done => {
        yamoneyWebhook({
            body: {
                label: 'WA151_2191M',
                withdraw_amount: '' + (2191 * 900),
            }
        }).then(response => {
            const calls = extendPayment.mock.calls;
            assert.strictEqual(1, calls.length);
            assert.strictEqual(2191 * 30, calls[0][0].days);
            assert.strictEqual(151, calls[0][0].accountNumber);
            assert(calls[0][0].paymentTs < +new Date && calls[0][0].paymentTs > +new Date - 1000);
            assert.strictEqual('Yandex.Money - card', calls[0][0].method);
            assert.strictEqual(2191 * 900, calls[0][0].summ);
            assert.strictEqual(1, sendTelegramNotification.mock.calls.length);
            done();
        })
    });
    it('should not work for wrong payment amount and send Telegram notification', () => {
        yamoneyWebhook({
            body: {
                label: 'WA151_3M',
                withdraw_amount: '1800',
            }
        }).catch(e => {
            assert.strictEqual(0, extendPayment.mock.calls.length);
            assert.strictEqual(1, sendTelegramNotification.mock.calls.length);
            done();
        })
    });
});