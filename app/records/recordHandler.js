const config = require('../../config');

module.exports = (queue, recordFilter) => {
  return async function (record) {
    const recordObj = JSON.parse(record);

    if (!recordFilter(recordObj.context)) {
      return null;
    }
    return queue.publish(config.jobQueue, record);
  };
};
