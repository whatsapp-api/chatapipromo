"use strict";
//libs
const queryString = require('query-string');
const axios = require('axios');
//modules
//init

export default function (url, method = 'GET', data = {}) {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method
    };
    if (['POST', 'PUT', 'PATCH'].indexOf(method) !== -1) {
        options.headers['Content-Type'] = 'application/json';
        options.data = data;
    } else {
        url += (url.indexOf('?') === -1) ? '?' : '&';
        url += queryString.stringify(data);
    }
    options.url = url;

    options.timeout = 10 * 60 * 1000;
    return axios(options)
        .then(resp => ({data: (resp.data), status: resp.status}))
        .catch(e => Promise.reject({
            data: (e.response) ? e.response.data : 'axios:no data in response',
            status: (e.response) ? e.response.status : 'axios:no status in response'
        }));
};
