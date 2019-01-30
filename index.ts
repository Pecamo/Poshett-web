#!/usr/bin/env node

// import * as express from 'express';

const fs = require('fs');
const util = require('util');
const path = require('path');
const exec = util.promisify(require('child_process').exec);
const spawn = require('child_process').spawn;
const execSync = util.promisify(require('child_process').execSync);
const filetype = require('file-type');

const express = require('express');

import * as getCover from '../poshett-musicbrainz';

const app = express();
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('index.html'));
});

let port = process.argv[2] || 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`));
