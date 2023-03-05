const fs = require('fs');

class MediumManager {
  constructor(converter) {
    this.converter = converter;
    this.mediumAuthors = [{}];
  }

  async post({ authorName, fileName, fileLocation }, authorToken) {
    try {
      const authorId = await this.findMediumAuthorIdBy(authorToken);
      const isMarkdown = fileName.endsWith('.md');
      const isHtml = fileName.endsWith('.html');
      const data = {
        // title: fileName.split('.')[0], // Medium supports writing title from MD file
        contentFormat: isMarkdown ? 'markdown' : 'html',
        content: this.getArticles(fileLocation, isMarkdown, isHtml),
        // canonicalUrl: 'http://localhost:8080/post/453133',
        publishStatus: 'draft',
        notifyFollowers: false,
      };

      const response = await fetch(
        `https://api.medium.com/v1/users/${authorId}/posts`,
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${authorToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const responseJson = await response.json();
      console.log('created post');
      console.log(responseJson);
    } catch (err) {
      console.error(
        `Medium Manager :: post / author ${authorName}:: error ${err}`,
      );
    }
  }

  getArticles(fileLocation, isMarkdown, isHtml) {
    return isMarkdown || isHtml
      ? fs.readFileSync(fileLocation, 'utf8')
      : this.converter.toHtml(fs.readFileSync(fileLocation, 'utf8')); // TODO: remove or change
  }

  async findMediumAuthorIdBy(authorToken) {
    if (!this.mediumAuthors[authorToken]) {
      const response = await fetch('https://api.medium.com/v1/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authorToken}`,
        },
      });
      const responseJson = await response.json();
      console.log(responseJson.data);
      this.mediumAuthors[authorToken] = responseJson.data;
      return responseJson.data?.id;
    }
    return this.mediumAuthors[authorToken].id;
  }
}

module.exports = MediumManager;
