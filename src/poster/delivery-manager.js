const fetch = require('node-fetch');
const { GithubActionHelper } = require('../utils/index');

class DeliveryManager {
  // constructor(secretPath, authorsPath) {
  constructor(secretPath) {
    this.secret = GithubActionHelper.loadSecret(secretPath);
    // this.authors = GithubActionHelper.loadAuthorNames(authorsPath);
  }

  async deliver() {
    // TODO: Add added paths
    await this.deliverToMedium({});
  }

  // async deliverToMedium({ authorName, article }) {
  async deliverToMedium({ authorName }) {
    const authorId = await this.findMediumAuthorIdBy(authorName);
    const authorToken = await this.secret[authorName];
    const body = {
      title: 'Sample post',
      contentFormat: 'html',
      content:
        '<h1>Sample post Mango</h1><caption>Little description</caption>',
      canonicalUrl: 'http://localhost:8080/post/453133',
      publishStatus: 'draft',
      notifyFollowers: false,
    };
    const response = await fetch(
      `https://api.medium.com/v1/users/${authorId}/posts`,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { Authorization: `Bearer ${authorToken}` },
      },
    );
    const data = await response.json();

    console.log(data);
  }

  /*  async findMediumAuthorIdBy(authorName) {
    const response = await fetch('https://api.medium.com/v1/me');
    const data = await response.json();

    console.log(data);
  } */
}

module.exports = DeliveryManager;
