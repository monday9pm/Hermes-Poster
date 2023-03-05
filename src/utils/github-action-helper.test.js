const GithubActionHelper = require('./github-action-helper');

describe('GithubActionHelper', () => {
  test('loadSecret', () => {
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
    const result = GithubActionHelper.loadSecret('action-secret-test.conf');
    expect(JSON.stringify(result.user1)).toBe(JSON.stringify(expected.user1));
    expect(JSON.stringify(result.user2)).toBe(JSON.stringify(expected.user2));
    expect(JSON.stringify(result.user3)).toBe(JSON.stringify(expected.user3));
  });

  test('loadArticlesMeta :: normal', () => {
    const result = GithubActionHelper.loadArticlesMeta(
      'action-articles-test.conf',
      'articles',
      4,
    );
    expect(result[0].authorName).toBe('jay');
    expect(result[1].authorName).toBe('tom');
    expect(result[2].authorName).toBe('livermore');

    expect(result[0].writtenYear).toBe('2023');
    expect(result[1].writtenYear).toBe('2024');
    expect(result[2].writtenYear).toBe('2025');

    expect(result[0].fileName).toBe('temp.md');
    expect(result[1].fileName).toBe('temp1.md');
    expect(result[2].fileName).toBe('temp2.md');

    expect(result[0].fileLocation).toBe('articles/2023/jay/temp.md');
    expect(result[1].fileLocation).toBe('articles/2024/tom/temp1.md');
    expect(result[2].fileLocation).toBe('articles/2025/livermore/temp2.md');
  });

  test('loadArticlesMeta :: normalPathDepth 5', () => {
    const result = GithubActionHelper.loadArticlesMeta(
      'action-articles-test.conf',
      'articles',
      5,
    );
    expect(result[2].authorName).toBe('livermore');
    expect(result[2].writtenYear).toBe('2025');
    expect(result[2].fileName).toBe('temp2.md');
    expect(result[2].fileLocation).toBe('articles/2025/livermore/temp2.md');

    expect(result[3].authorName).toBe('user1');
    expect(result[3].writtenYear).toBe('2025');
    expect(result[3].fileName).toBe('temp.md');
    expect(result[3].fileLocation).toBe('articles/2025/user1/temp.md');

    expect(result[4].authorName).toBe('user1');
    expect(result[4].writtenYear).toBe('2025');
    expect(result[4].fileName).toBe('Why-we-should-use-test-code.md');
    expect(result[4].fileLocation).toBe(
      'articles/2025/user1/Why-we-should-use-test-code/Why-we-should-use-test-code.md',
    );

    expect(result[5].authorName).toBe('user1');
    expect(result[5].writtenYear).toBe('2025');
    expect(result[5].fileName).toBe('Why-we-should-use-test-code2.html');
    expect(result[5].fileLocation).toBe(
      'articles/2025/user1/Why-we-should-use-test-code2/Why-we-should-use-test-code2.html',
    );
  });
});
