const kcl = require('aws-kcl');
const util = require('util');
const logger = require('../logger');
const handler = require('./handler');

/**
 * Be careful not to use the 'stderr'/'stdout'/'console' as log destination since it is used to
 * communicate with the
 * {https://github.com/awslabs/amazon-kinesis-client/blob/master/src/main/java/com/amazonaws/services/kinesis/multilang/package-info.java MultiLangDaemon}.
 */

function recordProcessor() {
  const log = logger().getLogger('recordProcessor');
  let shardId;

  function handleRecord(data, partitionKey) {
    handler(data).then((result) => {
      log.info(`Partition Key=${partitionKey}, result=${result}`);
    });
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
      let sequenceNumber;

      for (const record of records) {
        const data = Buffer.from(record.data, 'base64').toString();
        const partitionKey = record.partitionKey;
        sequenceNumber = record.sequenceNumber;
        handleRecord(data, partitionKey);
      }

      if (!sequenceNumber) {
        completeCallback();
        return;
      }

      // If checkpointing, completeCallback should only be called once checkpoint is complete.
      processRecordsInput.checkpointer.checkpoint(sequenceNumber, (err, newSequenceNumber) => {
        log.info(util.format('Checkpoint successful. ShardID: %s, SeqenceNumber: %s',
          shardId, newSequenceNumber));
        completeCallback();
      });
    },

    shutdownRequested: (shutdownRequestedInput, completeCallback) => {
      shutdownRequestedInput.checkpointer.checkpoint((err) => {
        log.error(util.format('error: %s', err));
        completeCallback();
      });
    },

    shutdown: (shutdownInput, completeCallback) => {
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

module.exports = {
  run() {
    kcl(recordProcessor()).run();
  }
};
