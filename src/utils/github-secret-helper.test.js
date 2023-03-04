const GithubSecretHelper = require('./github-secret-helper');

describe('GithubSecretHelper', () => {
  const testSecretInBase64 =
    'eyJ1c2VyMSI6eyJtZWRpdW0iOiIxMTExIiwib3RoZXIiOiIxMTExMSJ9LCJ1c2VyMiI6eyJtZWRpdW0iOiIyMjIyIiwib3RoZXIiOiIyMjIyMiJ9LCJ1c2VyMyI6eyJtZWRpdW0iOiIzMzMzIiwib3RoZXIiOiIzMzMzMyJ9fQ==';

  test('encrypt', () => {
    const expected = testSecretInBase64;
    const result = GithubSecretHelper.encrypt('secret.json', false);
    expect(result).toBe(expected);
  });

  test('decrypt', () => {
    const expected = {
      user1: {
        medium: '1111',
        other: '11111',
      },
      user2: {
        medium: '2222',
        other: '22222',
      },
      user3: {
        medium: '3333',
        other: '33333',
      },
    };

    const result = GithubSecretHelper.decrypt(testSecretInBase64);

    expect(JSON.stringify(result.user1)).toBe(JSON.stringify(expected.user1));
    expect(JSON.stringify(result.user2)).toBe(JSON.stringify(expected.user2));
    expect(JSON.stringify(result.user3)).toBe(JSON.stringify(expected.user3));
  });
});
