const EventEmitter = require('events');
const Connector = require('./_connector');
const log = require('../../logger')().getLogger('recordProcessor');

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
    const ok = this.connection.defaultChannel();
    ok.then(() => this.connection.assertQueue(this.config.jobQueue, options));
    ok.then(() => this.connection.setPrefetch(this.config.queuePrefetch));
    ok.then(() => this.connection.recover());
    ok.then(() => this.emit('ready'));
    ok.catch(this.onError);
  }

  onLost() {
    log.info('connection to queue lost');
    this.emit('lost');
  }

  onError() {
    log.error('error with queue connection');
    this.emit('lost');
  }

  publish(queueName, task) {
    return this.connection.sendToQueue(queueName, task);
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
