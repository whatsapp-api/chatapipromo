"use strict";
//libs
//modules
const extendPayment = require('../components/extendPayment');
const sendTelegramNotification = require('../registration/sendTelegramNotification');
//init

const PRICE = 900;

module.exports = function ({body}) {
    //TODO verify payment
    const amount = parseInt(body.withdraw_amount);
    const {account, months} = parseLabel(body.label);

    //verify amount
    if (amount !== PRICE * months) {
        sendTelegramNotification(`Оплата не прошла. Сумма не совпадает. ${amount} !== ${PRICE} * ${months}`);
        return Promise.resolve(`Оплата не прошла. Сумма не совпадает. ${amount} !== ${PRICE} * ${months}`);
    }

    sendTelegramNotification(`Оплата прошла. Аккаунт ${account} ${amount} руб на ${months} месяцев`);

    return extendPayment({
        days: 30 * months,
        accountNumber: account,
        paymentTs: +new Date,
        method: 'Yandex.Money - card',
        summ: amount
    })
};

const parseLabel = label => {
    const parts = label.split('_');
    if (parts.length !== 2 || parts[0].indexOf('WA') !== 0 || parts[1].slice(-1) !== 'M') {
        sendTelegramNotification(`Непонятный формат label: "${label}"`);
        throw 'Unknown label format';
    }
    const account = parseInt(parts[0].replace('WA', ''));
    const months = parseInt(parts[1].replace('M', ''));
    return {account, months};
};