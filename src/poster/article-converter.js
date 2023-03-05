const { marked } = require('marked');
const fs = require('fs');
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

  static generateArticle(
    fileLocation,
    midPath,
    baseImageDirPath = 'https://raw.githubusercontent.com/monday9pm/Hermes-Poster/main',
  ) {
    const originalArticle = fs.readFileSync(fileLocation, 'utf8');
    console.log(`baseImageDirPath: ${baseImageDirPath}`);

    return ArticleConverter.convertImageDirPath(
      originalArticle,
      `${baseImageDirPath}/${midPath}`,
    );
  }

  // TODO: Needs Test Code - To be support HTML
  static convertImageDirPath(originalArticle, baseImageDirPath) {
    const uri = `(${baseImageDirPath}/assets/`;
    const regex = /\((assets\/)|(src="[\w%]+\/)|(href="[\w%]+\/)/g;
    return originalArticle.replace(regex, uri);
  }

  // TODO: Needs Test Code
  static isArticleFormat(fileName) {
    const isMarkdown = fileName.endsWith('.md');
    const isHtml = fileName.endsWith('.html');
    const isArticleFormat = isMarkdown || isHtml;

    return { isArticleFormat, isMarkdown, isHtml };
  }
}

module.exports = ArticleConverter;
