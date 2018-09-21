/**
 * Created by sajjad on 5/29/18.
 */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Express from 'express';
import App from '../components/App';

const router = Express.Router();

router.get('*', (request, response, next) => {
  const context = {};

  const markup = ReactDOMServer.renderToString((
      <App />
  ));

  response.status(context.status || 200);
  response.send(`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Isomorphic Webpack Example</title>
      </head>
      <body>
        <div id="root">${markup}</div>
        <script src="/assets/dist/main.js"></script>
      </body>
    </html>
    `);
});

// catch any exception as 5XX http err
router.use(function (err, request, response, next) {
  console.error(err.toString()); // eslint-disable-line
  response.status(500);
  response.send(`<pre>${err}</pre>`);
});

export default router;
