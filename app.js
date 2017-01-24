var http = require('http'),
	fileSystem = require('fs'),
	path = require('path');

http.createServer(function(request, response){
	var filePath = path.join('box', 'file.txt');
	var stat = fileSystem.statSync(filePath);

	response.writeHead(200, {
		// 'Content-Type': 'text/plain',
		'Content-Type': 'application/octet-stream',
		'Content-Length': stat.size,
		'Content-Disposition': 'attachment; filename="file.txt"'
		// 'Content-Type': 'image/png'
		// 'Content-Disposition': 'attachment; filename="picture.png"'
	});

	var readStream = fileSystem.createReadStream(filePath);
	// We replaced all the event handlers with a simple call to readStream.pipe()
	readStream.pipe(response);
}).listen(2000);