import app from '../app';
import http, { Server } from 'http';
import https from 'https';
import fs from 'fs';
import { Request, Response } from 'express';

const option =
  process.env.NODE_ENV === 'production'
    ? {
        key: fs.readFileSync(
          __dirname + '/../../../../cert/luckydata.domain.key.pem',
          'utf-8',
        ),
        cert: fs.readFileSync(
          __dirname + '/../../../../cert/luckydata.domain.pem',
          'utf-8',
        ),
        ca: fs.readFileSync(
          __dirname + '/../../../../cert/luckydata.domain.ca.pem',
          'utf-8',
        ),
      }
    : undefined;

option
  ? https.createServer(option, app).listen(4000, () => {
      console.log('https server on port : ', 4000);
    })
  : undefined;

option
  ? http
      .createServer((req: Request, res: Response) => {
        res.writeHead(301, {
          Location: 'https://' + req.headers['host'] + req.url,
        });
        res.end();
      })
      .listen(4001)
  : http.createServer(app).listen(4000, () => {
      console.log('http server on port : ', 4000);
    });
