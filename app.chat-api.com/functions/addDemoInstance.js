"use strict";
//libs
//modules
const addInstance = require('./components/addInstance');
//init
const DEMO_LENGTH_DAYS = 2;

module.exports = function (event) {
    const uid = event.data.uid;
    return addInstance(uid, DEMO_LENGTH_DAYS);
};