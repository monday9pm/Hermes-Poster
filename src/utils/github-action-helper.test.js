const GithubActionHelper = require('./github-action-helper');

describe('GithubActionHelper', () => {
  test('loadSecret', () => {
    const expected = {
      test1: '1111',
      test2: '2222',
      test3: '3333',
    };
    const result = GithubActionHelper.loadSecret('action-secret-test.json');
    expect(result.test1).toBe(expected.test1);
    expect(result.test2).toBe(expected.test2);
    expect(result.test3).toBe(expected.test3);
  });
});
