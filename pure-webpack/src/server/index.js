import "@babel/polyfill";
import { Server } from 'http';
import Express from 'express';
import router from "./dev";

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  app.use(require('./dev').default);
}

// universal routing and rendering
app.use(function (request, response, next) {
  // eslint-disable-next-line
  require('./main').default(request, response, next);
});

// error handler
app.use(function (error, request, response, next) {
  // eslint-disable-next-line
  require('./main').default(error, request, response, next);
});

if (module.hot) {
  // accept update of dependency

  module.hot.accept(['./main'], function () {
    // reload
    // eslint-disable-next-line
    require('./main');
  });
}

// server static assets
router.use(Express.static(path.join(__dirname, '..', '..', 'public')));

// start the server
const port = process.env.NODE_PORT;
server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server is running on http://localhost:${port}`);
});
