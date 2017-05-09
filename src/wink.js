// Description
//   NBC for messages
//
// Configuration:
//   LIST_OF_ENV_VARS_TO_SET
//
// Commands:
//   hubot hello - <what the respond trigger does>
//   orly - <what the hear trigger does>
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   Prateek Saxena <prtksxna@gmail.com>

var fs = require('fs');
var codex = JSON.parse(fs.readFileSync(__dirname + '/data/codex.json', 'utf8'));

var b = require('wink-utils/lib/text_nbc')();
var p = require('wink-utils/lib/prepare_text');

b.definePrepTasks( [
	p.string.tokenize0
] );

for( var key in codex ) {
	var messages = codex[ key ];
	messages.forEach( function ( m ) {
		b.learn( m, key, true );
	} );
}

b.consolidate();


module.exports = function(robot) {
	robot.receiveMiddleware( function ( context, next, done ) {
		var prediction = b.predict( context.response.message.toString() );
		if ( prediction !== undefined ) {
			context.response.message.text = prediction;
		}
		next();
	} );
};
