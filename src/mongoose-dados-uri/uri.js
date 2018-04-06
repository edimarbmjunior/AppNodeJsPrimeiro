//conecta ao banco de dados
//mongoose.connection('mongodb://nodejsedimar:nodejsedimar@ds117739.mlab.com:17739/nodejsteste');
const uri = 'mongodb://nodejsedimar:nodejsedimar@ds117739.mlab.com:17739/nodejsteste';

exports.recuperaUri = () => {
    return uri;
}
