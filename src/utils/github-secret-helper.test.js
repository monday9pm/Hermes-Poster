const GithubSecretHelper = require('./github-secret-helper');

describe('GithubSecretHelper', () => {
  test('encrypt', () => {
    const expected =
      'eyJ0ZXN0MSI6IjExMTEiLCJ0ZXN0MiI6IjIyMjIiLCJ0ZXN0MyI6IjMzMzMifQ==';
    const result = GithubSecretHelper.encrypt('secret.json', false);
    expect(result).toBe(expected);
  });

  test('decrypt', () => {
    const secretsInBase64 =
      'eyJ0ZXN0MSI6IjExMTEiLCJ0ZXN0MiI6IjIyMjIiLCJ0ZXN0MyI6IjMzMzMifQ==';
    const expected = {
      test1: '1111',
      test2: '2222',
      test3: '3333',
    };
    const result = GithubSecretHelper.decrypt(secretsInBase64);
    expect(result.test1).toBe(expected.test1);
    expect(result.test2).toBe(expected.test2);
    expect(result.test3).toBe(expected.test3);
  });
});
