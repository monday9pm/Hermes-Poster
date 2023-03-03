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

  static loadArticles(fileLocation = 'action-articles.conf') {
    try {
      const authors = fs.readFileSync(fileLocation, 'utf8');
      return authors.trim().split(' ');
    } catch (e) {
      console.log(e);

      return null;
    }
  }
}

module.exports = GithubActionHelper;
