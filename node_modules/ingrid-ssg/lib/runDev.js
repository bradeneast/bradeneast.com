const { dist } = require('./options.js');
const render = require('./render.js');
const makeTree = require('./makeTree.js');
const mime = require('./mimeTypes.js');
const fs = require('fs-extra');
const http = require('http');
const { join, extname, resolve } = require('path');


function runDev({ port, hostname }) {

	let root = resolve(dist);
	let server = http.createServer(handleRequest);

	server.listen(port, hostname, () =>
		console.log(`Server running at http://${hostname}:${port}/`)
	);


	function handleRequest(request, response) {

		let currentHref = request.url.toString().split('?')[0];
		let absolutePath = join(root, currentHref);
		let type = mime[extname(currentHref).slice(1)];
		let setType = type => response.setHeader('Content-Type', type);

		function renderCurrentPage() {
			let tree = makeTree();
			for (let page of tree)
				if (page.props.sys.href == currentHref)
					return render(page, tree).content;
			send404();
		}

		function send404() {
			setType('text/plain');
			response.statusCode = 404;
			response.end('Not found');
		}

		if (type) {
			let stream = fs.createReadStream(absolutePath);
			stream.on('open', () => {
				setType(type);
				stream.pipe(response);
			})
			stream.on('error', send404);
		}
		else {
			try {
				setType('text/html');
				response.end(renderCurrentPage());
			}
			catch (err) {
				console.error(err);
				send404();
			}
		}

	}
}


module.exports = runDev;