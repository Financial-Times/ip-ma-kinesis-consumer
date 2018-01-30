const selectn = require('selectn');

const messageType = selectn('ingest.context.messageType');
const action = selectn('ingest.action');
const isStaff = selectn('user.subscriptions.staff');
const user = selectn('user.uuid');

module.exports = () => {
  return (record = {}) => {
    if (messageType(record) === 'UserProductsChanged'
      || messageType(record) === 'SubscriptionPurchased'
      || (messageType(record) === 'EmailEvent' && action(record) === 'click')
      || (messageType(record) === 'EmailEvent' && user(record) === 'a73e0b60-e669-40b3-ba5e-0c8621cadac1')) {
      return true;
    }
    return false;
  };
};
