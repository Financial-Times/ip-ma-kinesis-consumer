require('dotenv').config({ silent: true });

const config = require('../config');
const queue = require('./queue');
const recordProcessor = require('./recordProcessor');

const queueInstance = new queue(config);
const processorInstance = recordProcessor(queueInstance);

queueInstance
  .on('ready', () => {
    processorInstance.run();
  })
  .on('error', (err) => {
    console.log(err);
  });

