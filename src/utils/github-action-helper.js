// For Generator from GitHub Secret to Json

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
   * @param fileLocation
   * @param articlePath
   * @param normalPathsDepth
   * @returns {null|{fileLocation: string}[]}
   */
  static loadArticlesMeta(
    fileLocation = 'action-articles.conf',
    articlePath = 'articles',
    normalPathsDepth = 4,
  ) {
    try {
      const articles = fs.readFileSync(fileLocation, 'utf8');
      const articlePaths = articles
        .trim()
        .split(' ')
        .filter(
          path => !path.search(articlePath) && path.length >= normalPathsDepth,
        )
        .map(path => {
          if (path.length < 4) {
            console.warn('Path length is less than 4!!');
            return [];
          }

          const part = path.split('/');

          return {
            writtenYear: part[1],
            authorName: part[2],
            fileName: part[3],
            fileLocation: path,
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
