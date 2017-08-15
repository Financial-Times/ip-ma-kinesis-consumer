module.exports = (record) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('done'), 1000);
  });
};
