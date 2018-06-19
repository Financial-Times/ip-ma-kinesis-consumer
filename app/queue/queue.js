const EventEmitter = require('events');
const Connector = require('./_connector');
const log = require('../../logger')().getLogger('recordProcessor');
const metrics = require('next-metrics');

class QueueApp extends EventEmitter {
  constructor(config) {
    if (!config.jobQueue) {
      throw new Error('Missing necessary message queue information');
    }
    super();
    this.config = config;
    this.connection = new Connector(config.rabbitUrl);
    this.connection.on('ready', this.onConnected.bind(this));
    this.connection.on('lost', this.onLost.bind(this));
    this.connection.on('error', this.onError.bind(this));
  }

  onConnected() {
    const options = { durable: true, autoDelete: false };
    // Set DL queue for retry

    const ok = this.connection.defaultChannel();
    ok.then(() => this.connection.assertExchange(this.config.jobExchange, 'direct', options));
    ok.then(() => this.connection.assertQueue(this.config.jobQueue, options));
    ok.then(() => this.connection.bindQueue(this.config.jobQueue, this.config.jobExchange,
      this.config.jobQueue));
    ok.then(() => this.connection.setPrefetch(this.config.queuePrefetch));
    ok.then(() => this.connection.recover());
    ok.then(() => this.emit('ready'));
    metrics.count('queue.ready');
    ok.catch(this.onError);
  }

  onLost() {
    log.info('connection to queue lost');
    metrics.count('queue.lost');
    this.emit('lost');
  }

  onError() {
    log.error('error with queue connection');
    metrics.count('queue.error');
    this.emit('lost');
  }

  publish(queueName, task) {
    metrics.count('queue.publish');
    return this.connection.publish(this.config.jobExchange, queueName, JSON.stringify(task));
  }

  closeChannel() {
    return this.connection.closeChannel();
  }

  closeConnection() {
    return this.connection.closeConnection();
  }

  purgeQueue(queueName) {
    return this.connection.purgeQueue(queueName);
  }
}

module.exports = QueueApp;
