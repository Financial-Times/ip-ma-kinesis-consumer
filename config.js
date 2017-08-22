const config = exports;

function int(str) {
  if (!str) {
    return 0;
  }
  return parseInt(str, 10);
}

// Queue config
config.rabbitUrl = process.env.CLOUDAMQP_URL || 'amqp://localhost';
config.queuePrefetch = int(process.env.QUEUE_PREFETCH) || 1;
config.jobQueue = process.env.JOB_QUEUE || 'ma.jobs.dev';
config.jobExchange = process.env.JOB_EXCHANGE || 'ma.jobs.exchange.dev';

// KCL & Kinesis
config.streamName = process.env.STREAM_NAME || 'ip-kclnodejssample';
config.applicationName = process.env.APPLICATION_NAME || 'ft-email_platform_kclnodejssample';
