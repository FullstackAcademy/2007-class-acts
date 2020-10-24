const { mediums } = require('../server/constants');

describe('Constants', () => {
  it('Has an array of mediums containing "strings"', () => {
    expect(mediums.length).toBeGreaterThan(0);
    mediums.forEach(m => expect(typeof m).toEqual('string'));
  });
});
