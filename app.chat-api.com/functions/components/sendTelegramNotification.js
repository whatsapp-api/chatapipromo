"use strict";
//libs
const request = require('request-promise');
//modules
const config = require('../config');
//init
const TELEGRAM_URL = 'https://api.telegram.org/bot' + config.TELEGRAM_TOKEN + '/sendMessage';

module.exports = function (text) {
    return request({
        uri: TELEGRAM_URL,
        method: 'POST',
        json: true,
        body: {
            chat_id: config.TELEGRAM_CHAT_ID,
            text
        },
        resolveWithFullResponse: true
    }).then(response => {
        if (response.statusCode >= 400) {
            throw new Error(`Could not send message: ${response.body}`);
        }
    });
};