const { marked } = require('marked');
// const fs = require('fs');

class ArticleConverter {
  static markDownToHtml(markdown) {
    return marked(markdown);
  }

  /*  static genArticle(articlePath) {
    const originalArticle = fs.readFileSync(articlePath, 'utf8');
    const convertedArticle = ArticleConverter.markDownToHtml(originalArticle);
  } */
}

module.exports = ArticleConverter;
