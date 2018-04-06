//Token utilizado - jwt token
global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761aj'; // Senha global do servidor
global.EMAIL_TMPL = 'Olá, <strong>{0}</strong>, seja bem vindo à NodeJs!';

module.exports = {
    connectionString: 'mongodb://nodejsedimar:nodejsedimar@ds117739.mlab.com:17739/nodejsteste',
    sendgridKey: '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',
    containerConnectionString: 'DefaultEndpointsProtocol=https;AccountName=nodejsed;AccountKey=dH20BGUyv2FCpSsunpEoQ72m2Mg33MGKWeaZfL6lawL2M1PfubBAIppqgOAwt2rlz+us56a5DxKiWXs9h2/NAg==;EndpointSuffix=core.windows.net'
}