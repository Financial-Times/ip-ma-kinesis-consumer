const recordFilter = require('./recordFilter');

const filter = recordFilter();

const passingTestEvents = [
  { ingest: { context: { messageType: 'UserProductsChanged' } } },
  { ingest: { context: { messageType: 'SubscriptionPurchased' } } },
  { ingest: { context: { messageType: 'SubscriptionPaymentFailure' } } },
  { ingest: { context: { messageType: 'SubscriptionPaymentSuccess' } } },
  { ingest: { context: { messageType: 'SubscriptionCancelRequestProcessed' } } },
  { ingest: { context: { messageType: 'EmailEvent' }, action: 'click' } },
  { ingest: { context: { messageType: 'EmailEvent', parentEmailId: '584010ed69bff20400ec3dd6' }, action: 'injection' } }
];

const failingTestEvents = [
  { ingest: { context: { messageType: 'BlahBlah' } } }
];

describe('Record Filter', () => {
  passingTestEvents.map((event) => {
    it('Returns true if the filters pass', () => {
      expect(filter(event)).toBeTruthy();
    });
  });

  failingTestEvents.map((event) => {
    it('Returns false for failing filters', () => {
      expect(filter(event)).toBeFalsy();
    });
  });
});
