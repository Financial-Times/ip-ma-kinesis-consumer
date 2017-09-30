const config = exports;

function int(str) {
  if (!str) {
    return 0;
  }
  return parseInt(str, 10);
}

config.nodeEnv = process.env.NODE_ENV || 'development';
config.development = config.nodeEnv === 'development';
config.production = config.nodeEnv === 'production';
config.test = config.nodeEnv === 'test';

// Queue config
config.rabbitUrl = process.env.CLOUDAMQP_URL || 'amqp://localhost';
config.queuePrefetch = int(process.env.QUEUE_PREFETCH) || 1;
config.jobQueue = process.env.JOB_QUEUE || 'ma.jobs.dev';
config.jobExchange = process.env.JOB_EXCHANGE || 'ma.jobs.exchange.dev';

// KCL & Kinesis
config.filterList = process.env.FILTER_LIST;

if (config.production) {
  config.streams = {
    // Outbound volt stream
    volt: {
      streamName: process.env.VOLT_STREAM_NAME,
      initialStreamPosition: process.env.VOLT_INITIAL_STREAM_POSITION,
      applicationName: process.env.VOLT_APPLICATION_NAME
    },
    // Spoor Inbound Volt Stream
    spoor: {
      streamName: process.env.SPOOR_STREAM_NAME,
      initialStreamPosition: process.env.SPOOR_INITIAL_STREAM_POSITION,
      applicationName: process.env.SPOOR_APPLICATION_NAME
    }
  };
} else if (config.development) {
  config.streams = {
    // Outbound volt stream
    devApp: {
      streamName: process.env.STREAM_NAME || 'ip-kclsample',
      initialStreamPosition: process.env.INITIAL_STREAM_POSITION || 'TRIM_HORIZON',
      applicationName: process.env.APPLICATION_NAME || 'ft-email_platform_kcl_sample'
    }
  };
}

// App
config.logLevel = process.env.LOG_LEVEL || 'info';
config.nodeLogDir = process.env.NODE_LOG_DIR || '.';
