const selectn = require('selectn');
const metrics = require('next-metrics');

// Selection criteria
const messageType = selectn('ingest.context.messageType');
const action = selectn('ingest.action');
const category = selectn('ingest.category');
const emailId = selectn('ingest.context.parentEmailId');
const path = selectn('url.pathname');

const logger = require('../../logger');
const log = logger().getLogger('recordProcessor');

module.exports = () => {
  return (record = {}) => {
    if (messageType(record) === 'UserProductsChanged'
      || messageType(record) === 'LicenceSeatAllocated'
      || messageType(record) === 'LicenceSeatDeallocated'
      || messageType(record) === 'SubscriptionPurchased'
      || messageType(record) === 'SubscriptionPaymentFailure'
      || messageType(record) === 'SubscriptionPaymentSuccess'
      || messageType(record) === 'SubscriptionCancelRequestProcessed'
      || (messageType(record) === 'EmailEvent' && action(record) === 'click')
      || (messageType(record) === 'EmailEvent' && action(record) === 'injection' && emailId(record) === '584010ed69bff20400ec3dd6')
      || (category(record) === 'page' && action(record) === 'view' && path(record) && path(record).indexOf('/myft/following/') === 0 )) {
        metrics.count(`recordFilter.messageType.${messageType(record)}.${action(record)}`, 1);
      return true;
    }
    return false;
  };
};
