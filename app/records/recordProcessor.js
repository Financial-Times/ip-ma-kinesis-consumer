const kcl = require('aws-kcl');
const config = require('../../config');
const util = require('util');
const logger = require('../../logger');
const shutdown = require('../shutdown');
const recordHandler = require('./recordHandler');
const recordFilter = require('./recordFilter');
// eslint-disable-next-line
const filterList = require(`./${config.filterList}`);

/**
 * Be careful not to use the 'stderr'/'stdout'/'console' as log destination since it is used to
 * communicate with the
 * {https://github.com/awslabs/amazon-kinesis-client/blob/master/src/main/java/com/amazonaws/services/kinesis/multilang/package-info.java MultiLangDaemon}.
 */

function recordProcessor(queue) {
  // Pass queue to handler
  const filter = recordFilter(filterList);
  const handler = recordHandler(queue, filter);
  const log = logger().getLogger('recordProcessor');
  let shardId;

  async function handleRecord(data, partitionKey) {
    try {
      const result = await handler(data);
      if (result) {
        log.info(`Partition Key=${partitionKey}, result=${result}`);
      }
    } catch (err) {
      log.error(`Error with Partition Key=${partitionKey}: ${err}`);
    }
  }

  async function handleRecords(records, callback) {
    let sequenceNumber;
    for (const record of records) {
      const data = Buffer.from(record.data, 'base64').toString();
      const partitionKey = record.partitionKey;
      sequenceNumber = record.sequenceNumber;
      await handleRecord(data, partitionKey);
    }

    callback(sequenceNumber);
  }

  return {

    initialize: (initializeInput, completeCallback) => {
      shardId = initializeInput.shardId;

      completeCallback();
    },

    processRecords: (processRecordsInput, completeCallback) => {
      if (!processRecordsInput || !processRecordsInput.records) {
        completeCallback();
        return;
      }
      const records = processRecordsInput.records;

      handleRecords(records, (sequenceNumber) => {
        // If checkpointing, completeCallback should only be called once checkpoint is complete.
        processRecordsInput.checkpointer.checkpoint(sequenceNumber, (err, newSequenceNumber) => {
          log.debug(util.format('Checkpoint successful. ShardID: %s, SeqenceNumber: %s',
            shardId, newSequenceNumber));
          completeCallback();
        });
      });
    },

    shutdownRequested: (shutdownRequestedInput, completeCallback) => {
      shutdownRequestedInput.checkpointer.checkpoint((err) => {
        log.error(util.format('error: %s', err));
        completeCallback();
      });
    },

    shutdown: (shutdownInput, completeCallback) => {
      shutdown(queue);
      // Checkpoint should only be performed when shutdown reason is TERMINATE.
      if (shutdownInput.reason !== 'TERMINATE') {
        completeCallback();
        return;
      }
      // When checkpointing, completeCallback should only be invoked once checkpoint is complete.
      shutdownInput.checkpointer.checkpoint((err) => {
        log.error(util.format('error: %s', err));
        completeCallback();
      });
    }
  };
}

module.exports = (queue) => {
  return {
    run() {
      kcl(recordProcessor(queue)).run();
    }
  };
};
