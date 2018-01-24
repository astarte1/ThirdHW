var http = require('http');
var fs = require('fs');

http.createServer(function(req,res){
	var stats = fs.statSync('demo.txt');
	var volume = stats.size;
	
	if(req.url === './stream'||volume > 2e+6){
		var stream  = fs.createReadStream('demo.txt');
		stream.pipe(res);
	}else if(req.url === '/file'){
		fs.readFile('demo.txt',function(err,data){
			if(err) throw new Error();
			res.write(data);
			res.end();
		});
	}
}).listen(3000,function(){console.log('Go to localhost 3000');});
