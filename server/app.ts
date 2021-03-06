import express, { NextFunction, Request, Response } from 'express';
import type { HttpError } from 'http-errors';
import path from 'path';
import morgan from 'morgan';
// const express = require('express');
// const path = require('path');
// const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./api'));

app.get('/', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '..', 'build'))
);

// serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'build')));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req: Request, res: Response, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    res.status(404);
    next(err);
  } else {
    next();
  }
});

app.use('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
