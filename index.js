//    node-require
//
//     Copyright (c) 2015 Simon Y. Blackwell, AnyWhichWay
//     MIT License - http://opensource.org/licenses/mit-license.php
(function() {
	var path = require('path');
	var fs = require('fs');
	function nexport(app,root,exports) {
		//console.log(root)
		app.get('/node_modules/*', function(req, res){
			var file = path.basename(req.url);
			console.log(file)
			if(exports.indexOf(file)>=0) {
				var filepath = path.join(root, req.url);
				var packagepath = path.join(filepath,"package.json");
				fs.readFile(packagepath, 'utf8', function(err,data) { // read package and send main file
					var pkg = JSON.parse(data);
					var file = path.resolve(filepath,(pkg.main.lastIndexOf(".js")===pkg.main.length-3 ? pkg.main : pkg.main + ".js"));
					res.sendFile(file);
				});
			} else {
				res.send('{}');
			}
		});
	}
	module.exports.export = nexport;
}).call(this);