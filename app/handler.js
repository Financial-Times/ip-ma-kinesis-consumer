const { matched } = require('./recordFilter');

module.exports = (queue) => {
  return (record) => {
    return new Promise((resolve) => {
      // Check if messageType in filter list
      if (!matched(record.body)) {
        return Promise.resolve();
      }
      queue.publish();

      setTimeout(() => resolve('done'), 1000);
    });
  };
};
