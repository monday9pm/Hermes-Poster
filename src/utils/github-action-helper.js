// For Generator from GitHub Secret to Json

const fs = require('fs');
const GithubSecretHelper = require('./github-secret-helper');

class GithubActionHelper {
  static loadSecret(fileLocation = 'action-secret.json') {
    try {
      const secretFiles = fs.readFileSync(fileLocation, 'utf8');
      return GithubSecretHelper.decrypt(secretFiles);
    } catch (e) {
      console.log(e);

      return null;
    }
  }
}

module.exports = GithubActionHelper;
