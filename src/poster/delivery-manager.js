const { GithubActionHelper } = require('../utils');
const ArticleConverter = require('./article-converter');
const MediumManager = require('./mediums/medium-manager');

class DeliveryManager {
  constructor(secretConfigFileName, articlesConfigFileName, baseImageDirPath) {
    this.mediumManager = new MediumManager(ArticleConverter, baseImageDirPath);
    this.secret = GithubActionHelper.loadSecret(secretConfigFileName);
    this.articleInfos = GithubActionHelper.loadArticlesMeta(
      articlesConfigFileName,
    );
  }

  deliver() {
    if (this.isConfigOk()) {
      this.articleInfos.forEach(articleInfo => {
        const authorToken = this.secret[articleInfo.authorName]?.medium;
        if (authorToken) {
          this.mediumManager.post(articleInfo, authorToken).then(() => {
            console.info(`Medium Manager sent to ${articleInfo.authorName}`);
          });
        } else {
          console.warn(`Token not found for ${articleInfo.authorName}`);
        }
      });
    }
  }

  isConfigOk() {
    if (this.secret == null) {
      console.error('Secret config not found');
      return false;
    }
    if (this.articleInfos == null) {
      console.error('Articles config not found');
      return false;
    }
    return true;
  }
}

module.exports = DeliveryManager;
