const selectn = require('selectn');

const messageType = selectn('ingest.context.messageType');
const action = selectn('ingest.action');
const isStaff = selectn('user.subscriptions.staff');

module.exports = () => {
  return (record = {}) => {
    if (messageType(record) === 'UserProductsChanged'
      || (messageType(record) === 'EmailEvent' && action(record) === 'click')
      || isStaff(record)) {
      return true;
    }
    return false;
  };
};
