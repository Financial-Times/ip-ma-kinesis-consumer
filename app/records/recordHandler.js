const config = require('../../config');
const metrics = require('next-metrics');

module.exports = (queue, recordFilter) => {
  return async function (record) {
    metrics.count('recordHandler.count');
    const recordObj = JSON.parse(record);
    let context = {};

    if (recordObj.egest && recordObj.egest.annotations) {
      context = recordObj.egest.annotations;
      
      if (recordObj.egest.annotations.time && recordObj.egest.annotations.ingest && recordObj.egest.annotations.ingest.context) {
				const product = recordObj.egest.annotations.ingest.context.product ? recordObj.egest.annotations.ingest.context.product.replace(/\s+/g, '') : 'no-product';
        metrics.histogram(`recordHandler.age.${product}`, new Date() - new Date(recordObj.egest.annotations.time.now));
      }
    }

    if (!recordFilter(context)) {
      metrics.count('recordHandler.fail', 1);
      return null;
    }

    metrics.count('recordHandler.pass', 1);
    return queue.publish(config.jobQueue, context);
  };
};
