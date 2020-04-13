export const environment = {
    production: true,
    environment: 'prd',
    privateKeyJWT: '@PRDTQEGTUI',
    jwtExpiresIn: '1h',
    redisDefaultConf: {
        time: 30,
        userFindAll: 'userFindAll'
    },
    queueURL: 'amqp://guest:guest@localhost:5672',
    queueFraudAnalyses: 'fraudAnalyses',
    queueCreditAnalyses: 'creditAnalyses',
    queueDocumentAnalyses: 'documentAnalyses',
    mongoURL: 'mongodb://127.0.0.1:27017/account'
}