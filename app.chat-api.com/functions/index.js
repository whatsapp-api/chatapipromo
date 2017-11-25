//libs
const functions = require('firebase-functions');
const admin = require('firebase-admin');
//modules
const addDemoInstance = require('./addDemoInstance');
//init
admin.initializeApp(functions.config().firebase);

exports.debug = functions.https.onRequest((request, response) => {
    return addDemoInstance(require('./test/dummyRegistrationData')).then(data => {
        response.send(JSON.stringify(data,null,2));
    })
});

exports.addDemoInstance = functions.auth.user().onCreate(addDemoInstance);