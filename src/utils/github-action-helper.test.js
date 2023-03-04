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

  test('loadArticlesMeta', () => {
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
});
