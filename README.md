# poshett-web

[![npm version](https://img.shields.io/npm/v/@fnu/poshett-web.svg?colorB=blue&style=flat)](https://badge.fury.io/js/%40fnu%2Fposhett-web)

**poshett-web** is the common HTML server and visual interface part of the Poshett project.

## Installing

Add to your project using:

```bash
npm install @fnu/poshett-web
```

## Usage

```js
var poshett = require('@fnu/poshett-web');

poshett.initServer();

poshett.startServer(); // Server runs on localhost:3000

poshett.setCurrentMusic({
    title: 'Never Gonna Give You Up',
    artist: 'Rick Astley',
    imgUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1c/Rick_Astley_-_Whenever_You_Need_Somebody.png'
});
```
