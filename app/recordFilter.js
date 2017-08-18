const isMatch = require('lodash/isMatch');

module.exports = (filterList = []) => {
  return (record) => {
    for (const item of filterList) {
      if (isMatch(record, item)) {
        return true;
      }
    }
    return false;
  };
};
