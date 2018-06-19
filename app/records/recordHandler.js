const config = require('../../config');
const metrics = require('next-metrics');

module.exports = (queue, recordFilter) => {
  return async function (record) {
    metrics.count('recordHandler.count');
    const recordObj = JSON.parse(record);
    let context = {};

    if (recordObj.egest && recordObj.egest.annotations) {
      context = recordObj.egest.annotations;
    }

    if (!recordFilter(context)) {
      metrics.count('recordHandler.fail');
      return null;
    }

    metrics.count('recordHandler.pass');
    return queue.publish(config.jobQueue, context);
  };
};
