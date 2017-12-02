"use strict";
//libs
const admin = require('firebase-admin');
//modules
//init
module.exports = function ({instanceId, paidTill}) {
    admin.database().ref(`/instances/${instanceId}/usedBy`).once('value').then(snapshot=>{
        const uid = snapshot.val();
        const promises = [
            admin.database().ref(`/instances/${instanceId}/paidTill`).set(paidTill),
            admin.database().ref(`/users/${uid}/instances/${instanceId}/paidTill`).set(paidTill),
        ];
        return Promise.all(promises);
    })
};