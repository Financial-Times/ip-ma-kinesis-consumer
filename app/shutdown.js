const logger = require('../logger');

/* istanbul ignore next */
module.exports = (queue) => {
  logger.info('shutting down');
  const ok = Promise.resolve();
  if (queue) {
    ok.then(() => queue.closeChannel());
    ok.then(() => queue.closeConnection());
  }
  ok.then(() => setTimeout(process.exit, 1000));
  ok.catch(() => setTimeout(process.exit.bind(null, 66), 1000));
};
