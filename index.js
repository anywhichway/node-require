//    node-require
//
//     Copyright (c) 2015 Simon Y. Blackwell, AnyWhichWay
//     MIT License - http://opensource.org/licenses/mit-license.php
(function() {
	function nexport(app,root,exports) {
		app.get(root + '/*', function(req, res){
			var file = path.basename(req.url);
			console.log(file)
			if(exports.indexOf(file)>=0) {
				var filepath = path.join(__dirname, req.url);
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