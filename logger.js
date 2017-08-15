const log4js = require('log4js');

function logger() {
  const logDir = process.env.NODE_LOG_DIR !== undefined ? process.env.NODE_LOG_DIR : '.';

  const config = {
    appenders: [
      {
        type: "file",
        filename: logDir + "/" + "application.log",
        pattern: "-yyyy-MM-dd",
        layout: {
          type: "pattern",
          pattern: "%d (PID: %x{pid}) %p %c - %m",
          tokens: {
            pid : function() { return process.pid; }
          }
        }
      }
    ]
  };

  log4js.configure(config, {});

  return {
    getLogger: function(category) {
      return log4js.getLogger(category);
    }
  };
}

module.exports = logger;
