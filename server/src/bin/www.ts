import app from '../app';

/*
import https from 'https';
import { readFileSync } from 'fs';
import path from 'path';

const option = {
  key: readFileSync(__dirname + '/../../keys/private.pem'),
  cert: readFileSync(__dirname + '/../../keys/public.pem'),
};

https.createServer(option, app).listen(4000, () => {
  console.log('HTTPS server listening on port ' + 4000);
});

*/

import http from 'http';
http.createServer(app).listen(4000, () => {
  console.log('http server on port : ', 4000);
});
