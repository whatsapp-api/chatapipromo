//libs
//modules
import fetch from '../utils/fetch';
//init

const cache = {};
const loading = {};

const getStatus = ({apiUrl, token, useCache = false}) => {
    const url = `${apiUrl}/status?token=${token}`;

    //cache
    if (cache[url] && useCache) {
        return Promise.resolve(cache[url]);
    }
    if (loading[url]) {
        console.log('---- Не загружаем, а ждем предыдущего резолва');
        return loading[url];
    }

    loading[url] = fetch(url).then(({data}) => {
        cache[url] = data;
        loading[url] = null;
        return cache[url];
    }).catch(e => {
        loading[url] = null;
        return Promise.reject(e);
    });

    return loading[url];
};
export default {getStatus};