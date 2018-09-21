const path = require('path');
const Server = require('http').Server;
const Express = require('express');

// initialize the server
const app = new Express();
const server = new Server(app);

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  app.use(require('./dev'));
} else if (process.env.NODE_ENV === 'production') {
  const SERVER_RENDERER_PATH = path.join(__dirname, '../../dist/server.bundle.js');
  const serverRenderer = require(SERVER_RENDERER_PATH).default;
  app.use(serverRenderer());
}

// server static assets
app.use(Express.static(path.join(__dirname, '..', '..', 'public')));

// start the server
const port = process.env.NODE_PORT;
server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server is running on http://localhost:${port}`);
});
