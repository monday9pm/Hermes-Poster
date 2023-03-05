const fs = require('fs');
const GithubSecretHelper = require('./github-secret-helper');

class GithubActionHelper {
  static loadSecret(fileLocation = 'action-secret.conf') {
    try {
      const secretFiles = fs.readFileSync(fileLocation, 'utf8');
      return GithubSecretHelper.decrypt(secretFiles);
    } catch (e) {
      console.log(e);

      return null;
    }
  }

  /**
   * Load Articles MetaInfo object from file path
   * @param configFileName
   * @param articleMiddlePathKeyword
   * @param normalPathsDepth Path length is less than 4
   * @returns {null|{fileLocation: string}[]}
   */
  static loadArticlesMeta(
    configFileName = 'action-articles.conf',
    articleMiddlePathKeyword = 'articles',
    normalPathsDepth = 4,
  ) {
    try {
      if (normalPathsDepth.length < 4) {
        console.warn('Path length is less than 4!!');
        return null;
      }

      const articles = fs.readFileSync(configFileName, 'utf8');
      const articlePaths = articles
        .trim()
        .split(' ')
        .filter(
          path =>
            !path.search(articleMiddlePathKeyword) &&
            path.length >= normalPathsDepth,
        )
        .map(path => {
          const part = path.split('/');

          return {
            writtenYear: part[1],
            authorName: part[2],
            fileName: part
              .filter(value => value.endsWith('.md') || value.endsWith('.html'))
              .pop(),
            fileLocation: path,
            midPath: part
              .filter((value, index) => index < part.length - 1)
              .join('/'),
          };
        });
      return articlePaths;
    } catch (e) {
      console.log(e);

      return null;
    }
  }
}

module.exports = GithubActionHelper;
