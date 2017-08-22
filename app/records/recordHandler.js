const config = require('../../config');

module.exports = (queue, recordFilter) => {
  return async function (record) {
    const recordObj = JSON.parse(record);
    let context;

    if (recordObj.annotations) {
      context = recordObj.annotations.ingest;
    } else {
      context = recordObj;
    }
    if (!recordFilter(context)) {
      return null;
    }
    return queue.publish(config.jobQueue, record);
  };
};
