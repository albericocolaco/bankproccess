export const environment = {
    production: false,
    environment: 'default',
    privateKeyJWT: '@DEFAULTQEGTUI',
    jwtExpiresIn: '1h',
    redisDefaultConf: {
        time: 30,
        userFindByDocument: 'userFindByDocument'
    },
    queueURL: 'amqp://guest:guest@localhost:5672',
    queueFraudAnalyses: 'fraudAnalyses',
    queueCreditAnalyses: 'creditAnalyses',
    queueDocumentAnalyses: 'documentAnalyses',
    mongoURL: 'mongodb://127.0.0.1:27017/account'
}