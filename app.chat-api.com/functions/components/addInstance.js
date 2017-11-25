"use strict";
//libs
const admin = require('firebase-admin');
//modules
const getAvailableInstances = require('./getAvailableInstances');
const sendTelegramNotification = require('./sendTelegramNotification');
//init
module.exports = function (uid, days = 30) {
    let instance;
    return getAvailableInstances(10).then(instances => {
            if (instances.length === 0) {
                return sendTelegramNotification('Нет инстансов, все плохо');
            }

            instance = instances[0];
            const promises = [];

            //отправить email
            let text = 'Новая регистрация. ';
            if (instances.length === 10) {
                text += 'Осталось как минимум ' + instances.length + ' инстансов';
            } else if (instances.length > 1) {
                text += 'Инстансы кончаются. Осталось всего ' + instances.length + '.';
            } else {
                text += 'Последний инстанс был использован!!!11!11!';
            }
            promises.push(sendTelegramNotification(text));
            promises.push(admin.database().ref(`/instances/${instance.id}/usedBy`).set(uid));
            promises.push(admin.database().ref(`/users/${uid}/instances/${instance.id}`).set(instance));

            return Promise.all(promises);
        }
    )
};