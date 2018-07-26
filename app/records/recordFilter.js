const selectn = require('selectn');
const metrics = require('next-metrics');

const messageType = selectn('ingest.context.messageType');
const action = selectn('ingest.action');
const emailId = selectn('ingest.context.parentEmailId');

module.exports = () => {
  return (record = {}) => {
    if (messageType(record) === 'UserProductsChanged'
      || messageType(record) === 'SubscriptionPurchased'
      || messageType(record) === 'SubscriptionPaymentFailure'
      || messageType(record) === 'SubscriptionPaymentSuccess'
      || messageType(record) === 'SubscriptionCancelRequestProcessed'
      || (messageType(record) === 'EmailEvent' && action(record) === 'click')
      || (messageType(record) === 'EmailEvent' && action(record) === 'injection' && emailId(record) === '584010ed69bff20400ec3dd6')) {
        metrics.count(`recordFilter.messageType.${messageType(record)}.${action(record)}`, 1);
      return true;
    }
    return false;
  };
};
