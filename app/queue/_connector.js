const amqplib = require('amqplib');
const EventEmitter = require('events');
const log = require('../../logger')().getLogger('recordProcessor');

class Connector extends EventEmitter {
  constructor(queueURL) {
    super();
    this.connect(queueURL);
  }

  connect(queueURL) {
    return amqplib.connect(queueURL).then((conn) => {
      conn.on('error', (err) => {
        log.error(err);
      });

      conn.on('close', () => {
        this.emit('lost');
        return setTimeout(() => {
          this.connect(queueURL);
        }, 1000);
      });

      log.info('connected to queue');
      this.conn = conn;
      this.emit('ready');
    }).catch((err) => {
      this.emit('lost');
      log.error(err);
      return setTimeout(() => {
        this.connect(queueURL);
      }, 1000);
    });
  }

  defaultChannel() {
    return new Promise((resolve, reject) => {
      this.conn.createConfirmChannel()
        .then((channel) => {
          this.channel = channel;
          resolve();
        })
        .catch(reject);
    });
  }

  assertQueue(queue, options) {
    return this.channel.assertQueue(queue, options);
  }

  assertExchange(exchange, options) {
    return this.channel.assertExchange(exchange, options);
  }

  bindQueue(queue, exchange, pattern, args) {
    return this.channel.bindQueue(queue, exchange, pattern, args);
  }

  setPrefetch(amount) {
    return this.channel.prefetch(amount);
  }

  sendToQueue(queueName, task) {
    return new Promise((resolve, reject) => {
      this.channel.sendToQueue(queueName, new Buffer(task), {}, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  }

  cancel(consumerTag) {
    if (consumerTag) {
      this.channel.cancel(consumerTag);
    }
  }

  ack(task) {
    return this.channel.ack(task);
  }

  nack(task) {
    return this.channel.nack(task);
  }

  countMessages(queueName) {
    return new Promise((resolve, reject) => {
      this.channel.checkQueue(queueName)
        .then((details) => {
          resolve(details.messageCount);
        })
        .catch(reject);
    });
  }

  closeChannel() {
    try {
      return this.channel.close();
    } catch (alreadyClosed) {
      return Promise.resolve();
    }
  }

  closeConnection() {
    try {
      return this.conn.close();
    } catch (alreadyClosed) {
      return Promise.resolve();
    }
  }

  closeAll() {
    return new Promise((resolve) => {
      this.closeChannel()
        .then(() => this.closeConnection())
        .then(() => resolve())
        .catch(() => resolve());
    });
  }

  recover() {
    return this.channel.recover();
  }

  purgeQueue(queueName) {
    return this.channel.purgeQueue(queueName);
  }
}

module.exports = Connector;
