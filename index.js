var fs = require('fs');
var path = require('path');

module.exports = function (robot, scripts) {
	var scriptsPath = path.resolve(__dirname, 'src');
	if ( fs.existsSync( scriptsPath ) ) {
		var scriptList = fs.readdirSync( scriptsPath );
		for( var script in fs.readdirSync( scriptsPath ).sort() ) {
			script = scriptList[ script ];
			robot.loadFile(scriptsPath, script);
		}
	}
};
