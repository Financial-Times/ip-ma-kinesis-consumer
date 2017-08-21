#!/usr/bin/env node

require('dotenv').config({ silent: true });

const fs = require('fs');
const handlebars = require('handlebars');
const config = require('../config');

let templ;
try {
  templ = fs.readFileSync(process.argv[2], 'utf8');
} catch (err) {
  console.error(err);
  process.exit(10);
}

const output = handlebars.compile(templ)(config);
process.stdout.write(output, 'utf8');
