require('dotenv').config({ silent: true });

const config = require('../config');
const Queue = require('./queue/queue');
const recordProcessor = require('./records/recordProcessor');

const queueInstance = new Queue(config);
const processorInstance = recordProcessor(queueInstance);

queueInstance
  .on('ready', () => {
    processorInstance.run();
  })
  .on('error', (err) => {
    console.log(err);
  });

