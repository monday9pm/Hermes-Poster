const Converter = require('./article-converter');

describe('Converter', () => {
  test('markDownToHtml', () => {
    const markDown = '# Title\n**strong**';
    const expected =
      '<h1 id="title">Title</h1>\n<p><strong>strong</strong></p>\n';
    const result = Converter.markDownToHtml(markDown);
    expect(result).toBe(expected);
  });
});
