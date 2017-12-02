//libs
const functions = require('firebase-functions');
const admin = require('firebase-admin');
//modules
const addDemoInstance = require('./registration/addDemoInstance');
const yaMoneyWebhook = require('./payments/yamoneyWebhook');
//init
admin.initializeApp(functions.config().firebase);

exports.yaMoneyWebhook = functions.https.onRequest((request, response) => {
    return yaMoneyWebhook(request.body).then(data => {
        // response.send(JSON.stringify(data, null, 2));
        response.send(data);
    })
});

exports.addDemoInstance = functions.auth.user().onCreate(addDemoInstance);