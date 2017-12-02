module.exports = jest.fn().mockImplementation(({days, accountNumber, paymentTs, method, summ}) => {
    if (!days || !accountNumber || !paymentTs || !method || !summ) {
        throw 'Не все параметры для extendPayment';
    }
    return Promise.resolve()
});