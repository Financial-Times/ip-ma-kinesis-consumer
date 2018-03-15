const recordHandler = require('./recordHandler');

const pubResult = true;
const mockQueue = { publish: () => pubResult };

describe('Record Handler', () => {
  it('Does not publish record if not matched in filter', () => {
    const mockFilter = () => false;
    const handler = recordHandler(mockQueue, mockFilter);
    return expect(handler('{"testRecord": "test" }')).resolves.toBeFalsy();
  });

  it('Publishes record if matched in filter', () => {
    const mockFilter = () => true;
    const handler = recordHandler(mockQueue, mockFilter);
    return expect(handler('{ "testRecord": "test"}')).resolves.toEqual(pubResult);
  });

  it('Returns error if publish fails', () => {
    const err = new Error('Problem');
    const failMockQueue = { publish: () => Promise.reject(err) };
    const mockFilter = () => true;
    const handler = recordHandler(failMockQueue, mockFilter);
    return expect(handler('{"testRecord": "test"}')).rejects.toEqual(err);
  });

  it('Returns error if invalid record supplied', () => {
    const mockFilter = () => true;
    const handler = recordHandler(mockQueue, mockFilter);
    return expect(handler('{not valid json}')).rejects.toBeTruthy();
  });

  it('Passes the context of the record to the filter', () => {
    const context = { egest: { annotations: { hello: 'world' } } };
    const record = JSON.stringify(context);
    const mockFilter = jest.fn(() => true);
    const handler = recordHandler(mockQueue, mockFilter);
    handler(record);
    expect(mockFilter).toBeCalledWith(context.egest.annotations);
  });
});
