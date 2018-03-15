const config = require('../../config');

module.exports = (queue, recordFilter) => {
  return async function (record) {
    const recordObj = JSON.parse(record);
    let context = {};

    if (recordObj.egest && recordObj.egest.annotations) {
      context = recordObj.egest.annotations;
    }

    if (!recordFilter(context)) {
      return null;
    }

    return queue.publish(config.jobQueue, context);
  };
};
