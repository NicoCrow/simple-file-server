var http = require('http'),
	fileSystem = require('fs'),
	path = require('path');

http.createServer(function(request, response){
	console.log("request.url: ", request.url);

	var filename = "file.txt",
		stat,
		respHead,
		filePath;


	if(request.url == "/"){
		filename = "index.html";
	} else {
		filename = request.url.split("/").join("");
	};


	filePath = path.join('box', filename);


	try {
		stats = fileSystem.statSync(filePath);
		if(!stats){
			return;
		}
		sendFile();
	}
	catch (e) {
		response.writeHead(404, {
			'Content-Type': 'application/json'
		});
		response.end(
			JSON.stringify(
				{
					response: [
						"File \"",
						filename,
						"\" does not exist."
					].join("")
				}
			)
		);

		return;
	}

	function sendFile(){
		if(request.url == "/"){
			respHead = {
				'Content-Type': 'text/html'
			};
		} else {
			respHead = {
				'Content-Type': "application/octet-stream",
				'Content-Length': stats.size,
				'Content-Disposition': 'attachment; filename='+filename
			};
		};

		response.writeHead(200, respHead);

		var readStream = fileSystem.createReadStream(filePath);
		// We replaced all the event handlers with a simple call to readStream.pipe()
		readStream.pipe(response);
	};

}).listen(2000);