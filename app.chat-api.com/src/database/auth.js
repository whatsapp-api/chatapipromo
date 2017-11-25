//libs
//modules
import firebaseInstance from './firebase';
import * as firebase from 'firebase';
//init
let authCallbacks = [];

const onAuthChange = function (callback) {
    authCallbacks.push(callback);
};

const provider = new firebase.auth.GoogleAuthProvider();
let user = null;

const handleUserChange = newUser => {
    user = newUser;
    authCallbacks.map(callback => callback(user));
};

firebase.auth().onAuthStateChanged(function (newUser) {
    console.log('User changed', newUser);
    handleUserChange(newUser);
});

const providerSignIn = function (callback) {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        const token = result.credential.accessToken;
        console.log('Auth ok', {token, user});
    }).catch(function (error) {
        console.log('Auth error', error);
    });
};
export default {onAuthChange, providerSignIn, user};