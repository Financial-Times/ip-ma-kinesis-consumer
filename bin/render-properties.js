#!/usr/bin/env node

"use strict";

require('dotenv').config({ silent: true });

const fs = require('fs');
const handlebars = require('handlebars');
const config = require('../config');

let templ;
for (const stream of Object.keys(config.streams)) {
  try {
    templ = fs.readFileSync(process.argv[2], 'utf8');
    const output = handlebars.compile(templ)(config.streams[stream]);
    fs.writeFileSync(`./app/${config.streams[stream].applicationName}.properties`, output, 'utf-8');
  } catch (err) {
    console.error(err);
    process.exit(10);
  }
}
