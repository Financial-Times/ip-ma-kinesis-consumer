const recordFilter = require('./recordFilter');

const filterList = [
  { action: 'click' },
  { action: 'open', parentEmailId: '123456' },
  { messageType: 'UserPreferenceCreated' }
];

const filter = recordFilter(filterList);

describe('Record Filter', () => {
  it('Matches record in the filter list', () => {
    const record = { action: 'click' };
    expect(filter(record)).toBeTruthy();
  });

  it('Matches multiple property filter items', () => {
    const record = { action: 'open', parentEmailId: '123456' };
    expect(filter(record)).toBeTruthy();
  });

  it('Does not match a record in the filter list', () => {
    const record = { action: 'open' };
    expect(filter(record)).toBeFalsy();
  });
});
