"use strict";
//libs
const admin = require('firebase-admin');
//modules
//init
module.exports = function (max = 10) {
    return admin.database().ref('/instances').orderByChild('usedBy').limitToFirst(max).once('value').then(function (snapshot) {
        const obj = snapshot.val();
        const instances = Object.keys(obj).map(function (key) {
            return obj[key];
        });
        return instances.filter(instance => !instance.usedBy);
    });
};