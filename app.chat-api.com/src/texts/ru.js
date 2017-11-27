export default {
    auth: "Авторизация",
    onlyGoogle: "Авторизация и регистрация через Google-аккаунт",
    registerText: "При первой авторизации Вы получите 2 дня бесплатного доступа к API.",
    register: "Регистрация",
    loginWithGoogle: "Войти через Google",
    apiGateways: "Аккаунты API",
    payment: "Оплата",
    loading: "Загрузка...",
    accountStatus: {
        'loading': 'Инициализация. Обновите страницу.',
        'got qr code': 'Просканируйте QR-код',
        'authenticated': 'Авторизован',
        'unknown': 'Загрузка',
    },
    instanceCard: {
        statusLoading: "Ваш аккаунт WhatsApp в процессе загрузки и будет готов через 2 минуты. Обновите страницу.",
        loadingServer: "Загрузка информации с сервера...",
        loadingInstances: "Загрузка списка аккаунтов...",
        authStatus: 'Статус авторизации',
        needAuth: 'Авторизуйте аккаунт',
        scanIt: 'Это изображение нужно просканировать',
        statusUnknownRefresh: 'Похоже что система еще не включилась. Обновите страницу через одну минуту.',
        authInstruction: `Для отправки и приема сообщений Вы должны авторизовать наш сервер как WhatsApp Web.
        
1. Откройте WhatsApp на телефоне
2. Нажмите Настройки->WhatsApp WEB и добавить
3. Просканируйте код и держите телефон подключенным к интернету

Код можно сканировать в течении 1 минуты после загрузки. Отправка сообщений будет доступна сразу после авторизации.`,
    },
    playground: {
        whatsNext: 'Вы успешно прошли авторизацию.\nТеперь попробуйте отправить сообщение и прочитать историю.',
        sendMessageExample: 'Пример отправки сообщения',
        getMessagesExample: 'Пример чтения истории сообщений',
        receiver: 'Получатель в формате 79681234567',
        text: 'Текст сообщения',
        dummyText: 'WhatsApp API работает',
        send: 'Отправить',
        requestToSend: 'Будет отправлен запрос',
        gotResponse: 'Получили ответ от сервера',
        checkOnPhone: 'Сообщение отправлено. Откройте WhatsApp на телефоне и проверьте последний диалог.',
        getMessagesExplain: 'Получите сообщения в формате JSON простыми GET-запросами. Сообщения появляются через 5 минут после авторизации.',
        fromZero: '100 первых сообщений',
        fromTen: '100 сообщений, начиная с 10го',
        moreInDocs: 'Подробнее в документации',
        getMessagesDocs: 'https://chat-api.com/ru/docs.html#get_messages',
        sendMessagesDocs: 'https://chat-api.com/ru/docs.html#post_message',
        paySoon: 'Ваш аккаунт оплачен на {context.paidTillDays} дн. до {context.paidTillDate}.',
        payFuckUp: 'Ваш аккаунт просрочен на {context.fuckUpDays} дн. (до {context.paidTillDate}) и скоро будет удален.',
        payMore: 'Продлить оплату',
    }
}