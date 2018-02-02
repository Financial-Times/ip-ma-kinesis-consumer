const selectn = require('selectn');

const messageType = selectn('ingest.context.messageType');
const action = selectn('ingest.action');
const emailId = selectn('ingest.context.parentEmailId');
const isStaff = selectn('user.subscriptions.staff');
const user = selectn('user.uuid');

module.exports = () => {
  return (record = {}) => {
    if (messageType(record) === 'UserProductsChanged'
      || messageType(record) === 'SubscriptionPurchased'
      || messageType(record) === 'SubscriptionPaymentFailure'
      || messageType(record) === 'SubscriptionPaymentSuccess'
      || (messageType(record) === 'EmailEvent' && action(record) === 'click')
      || (messageType(record) === 'EmailEvent' && action(record) === 'injection' && emailId(record) === '584010ed69bff20400ec3dd6')) {
      return true;
    }
    return false;
  };
};
