const config = require('../config');

module.exports = (queue, recordFilter) => {
  return async function (record) {
    if (!recordFilter(record)) {
      return null;
    }
    return queue.publish(config.jobQueue, record);
  };
};
