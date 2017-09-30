const log4js = require('log4js');
const config = require('./config');

function logger() {
  const logDir = config.nodeLogDir;

  const conf = {
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
      default: { appenders: ['recordOut'], level: config.logLevel },
      recordProcessor: { appenders: ['recordOut'], level: config.logLevel }
    }
  };

  log4js.configure(conf, {});

  return {
    getLogger: (category) => log4js.getLogger(category)
  };
}

module.exports = logger;
