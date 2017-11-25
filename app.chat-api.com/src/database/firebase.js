//libs
import * as firebase from 'firebase';
//modules
//init

const app = firebase.initializeApp({
    apiKey: "AIzaSyCbPeSWvAD0LTeMJFuKl5K-az1W3rheIGI",
    authDomain: "app-chat-api-com.firebaseapp.com",
    databaseURL: "https://app-chat-api-com.firebaseio.com",
    projectId: "app-chat-api-com",
    storageBucket: "app-chat-api-com.appspot.com",
    messagingSenderId: "201786676012"
});

window.firebaseDebug = app;

export default app;