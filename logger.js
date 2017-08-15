const log4js = require('log4js');

function logger() {
  const logDir = process.env.NODE_LOG_DIR !== undefined ? process.env.NODE_LOG_DIR : '.';

  const config = {
    appenders: {
      recordOut: {
        type: 'file',
        filename: `${logDir}/application.log`,
        pattern: '-yyyy-MM-dd',
        layout: {
          type: 'pattern',
          pattern: '%d (PID: %x{pid}) %p %c - %m',
          tokens: {
            pid: () => process.pid
          }
        }
      }
    },
    categories: {
      default: { appenders: ['recordOut'], level: 'info' },
      recordProcessor: { appenders: ['recordOut'], level: 'info' }
    }
  };

  log4js.configure(config, {});

  return {
    getLogger: (category) => log4js.getLogger(category)
  };
}

module.exports = logger;
