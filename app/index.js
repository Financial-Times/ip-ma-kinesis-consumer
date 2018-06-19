require('dotenv').config({ silent: true });

const config = require('../config');
const Queue = require('./queue/queue');
const recordProcessor = require('./records/recordProcessor');
const log = require('../logger')().getLogger('recordProcessor');
const shutdown = require('./shutdown');
const metrics = require('next-metrics');

metrics.init({
	app: 'ip-ma-kinesis-consumer',
	useDefaultAggregators: false,
	flushEvery: 40000
});

const queueInstance = new Queue(config);
const processorInstance = recordProcessor(queueInstance);

queueInstance
  .on('ready', () => {
    processorInstance.run();
  });

function onUncaughtException(error) {
  const message = 'Uncaught exception: process will exit';
  // In case log is not writeable, etc
  console.error(message, error);
  log.error(error, message);
  shutdown(queueInstance);
}

process.on('uncaughtException', onUncaughtException);
process.on('SIGTERM', () => shutdown(queueInstance));
process.on('SIGINT', () => shutdown(queueInstance));
