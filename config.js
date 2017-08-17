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
config.jobQueue = process.env.JOB_QUEUE || 'ma.job.dev';
