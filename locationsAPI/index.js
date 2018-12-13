var mongoose = require('mongoose');
var restify = require('restify');

// Server Configuration
var server = restify.createServer();
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

var locationSchema = new Schema({
    id: string,
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true },
    created_at: Date,
    updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var location = mongoose.model('Location', locationSchema);

// make this available to our users in our Node applications
module.exports = User;

server.listen(80, () => {
	// establish connection to mongodb
	mongoose.Promise = global.Promise;
	mongoose.connect('mongodb://localhost/locationdatabase', { useMongoClient: true });

	const db = mongoose.connection;

	db.on('error', (err) => {
	    console.error(err);
	    process.exit(1);
	});

	db.once('open', () => {
	    require('./routes')(server);
	    console.log(`Server is listening on port ${config.port}`);
	});
});

server.post('/', function(req, res, next){
    console.log(req.body);
});