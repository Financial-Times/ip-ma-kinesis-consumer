const recordFilter = require('./recordFilter');

module.exports = (queue) => {
  return (record) => {
    if (!recordFilter(record)) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve('done'), 1000);
    });
  };
};
