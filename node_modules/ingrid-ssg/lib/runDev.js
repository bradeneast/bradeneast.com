const options = require('./options.js');
const render = require('./render.js');
const makeTree = require('./makeTree.js');
const fs = require('fs-extra');
const http = require('http');
const path = require('path');
const { cwd } = require('process');
const { slash } = require('./utils.js');

function runDev({ port, hostname }) {

	let mime = {
		html: 'text/html',
		txt: 'text/plain',
		css: 'text/css',
		gif: 'image/gif',
		jpg: 'image/jpeg',
		png: 'image/png',
		svg: 'image/svg+xml',
		woff2: 'font/woff2',
		woff: 'font/woff',
		eot: 'font/eot',
		js: 'application/javascript'
	};
	let root = path.join(cwd(), options.dist);
	let server = http.createServer(handleRequest);

	server.listen(port, hostname, () =>
		console.log(`Server running at http://${hostname}:${port}/`)
	);

	function handleRequest(request, response) {

		let currentHref = request.url.toString().split('?')[0];
		let absolutePath = path.join(root, currentHref);
		let type = mime[path.extname(currentHref).slice(1)];

		let setType = type => response.setHeader('Content-Type', type);

		function renderCurrentPage() {
			let tree = makeTree();
			for (let page of tree)
				if (slash(page.props.sys.href) == slash(currentHref))
					return render(page, tree).content;
		}

		function send404() {
			setType('text/plain');
			response.statusCode = 404;
			response.end('Not found');
		}

		if (!type) {
			try {
				setType('text/html');
				response.end(renderCurrentPage());
			}
			catch (err) {
				console.error(err);
				send404();
			}
		}

		if (type) {
			let stream = fs.createReadStream(absolutePath);

			stream.on('open', () => {
				setType(type);
				stream.pipe(response);
			})
			stream.on('error', send404);
		}
	}
}

module.exports = runDev;