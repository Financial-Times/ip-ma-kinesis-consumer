const recordHandler = require('./recordHandler');

const pubResult = true;
const mockQueue = { publish: () => pubResult };

describe('Record Handler', () => {
  it('Does not publish record if not matched in filter', () => {
    const mockFilter = () => false;
    const handler = recordHandler(mockQueue, mockFilter);
    return expect(handler({ testRecord: 'test' })).resolves.toBeFalsy();
  });

  it('Publishes record if matched in filter', () => {
    const mockFilter = () => true;
    const handler = recordHandler(mockQueue, mockFilter);
    return expect(handler({ testRecord: 'test' })).resolves.toEqual(pubResult);
  });

  it('Returns error if publish fails', () => {
    const err = new Error('Problem');
    const failMockQueue = { publish: () => Promise.reject(err) };
    const mockFilter = () => true;
    const handler = recordHandler(failMockQueue, mockFilter);
    return expect(handler({ testRecord: 'test' })).rejects.toEqual(err);
  });
});
