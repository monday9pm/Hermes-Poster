const GithubActionHelper = require('./github-action-helper');

describe('GithubActionHelper', () => {
  test('loadSecret', () => {
    const expected = {
      test1: '1111',
      test2: '2222',
      test3: '3333',
    };
    const result = GithubActionHelper.loadSecret('action-secret-test.conf');
    expect(result.test1).toBe(expected.test1);
    expect(result.test2).toBe(expected.test2);
    expect(result.test3).toBe(expected.test3);
  });

  test('loadArticlesMeta', () => {
    const result = GithubActionHelper.loadArticlesMeta(
      'action-articles-test.conf',
      'docs',
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

    expect(result[0].fileLocation).toBe('docs/2023/jay/temp.md');
    expect(result[1].fileLocation).toBe('docs/2024/tom/temp1.md');
    expect(result[2].fileLocation).toBe('docs/2025/livermore/temp2.md');
  });
});
