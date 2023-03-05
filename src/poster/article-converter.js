const { marked } = require('marked');
// const fs = require('fs');

class ArticleConverter {
  static toHtml(origin, fileFormat) {
    if (fileFormat === 'md') {
      return ArticleConverter.markDownToHtml(origin);
    }
    return origin;
  }

  static markDownToHtml(markdown) {
    return marked(markdown);
  }

  static generateTitle(fileName) {
    return fileName.split('.')[0].replace(/-/g, ' ');
  }

  /*  static genArticle(articlePath) {
    const originalArticle = fs.readFileSync(articlePath, 'utf8');
    const convertedArticle = ArticleConverter.markDownToHtml(originalArticle);
  } */
}

module.exports = ArticleConverter;
