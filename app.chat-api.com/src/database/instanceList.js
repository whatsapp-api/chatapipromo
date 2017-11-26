"use strict";
//libs
import * as firebase from 'firebase';
//modules
import auth from './auth';
//init
const changeCallbacks = [];
let instancesObject = {};

const onChange = callback => {
    changeCallbacks.push(callback);
    triggerChanged(changeCallbacks);
};

const triggerChanged = function () {
    console.log('Got new instance list', instancesObject);
    changeCallbacks.map(callback => callback(instancesObject));
};

auth.onAuthChange(function (user) {
    if (!user) return;
    const ref = firebase.database().ref(`/users/${user.uid}/instances`);
    ref.on('value', snapshot => {
        instancesObject = snapshot.val();
        triggerChanged();
    });
    ref.once('value');
});

export default {onChange};

