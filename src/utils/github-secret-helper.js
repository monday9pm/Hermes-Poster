const moment = require('moment');
const fs = require('fs');

class GithubSecretHelper {
  static encrypt(configFileName = 'secret.json', needToMakeSecretFile = false) {
    const jsonFile = fs.readFileSync(configFileName, 'utf8');
    const secrets = JSON.parse(jsonFile);

    // Base64 Encoding
    const converted = Buffer.from(JSON.stringify(secrets), 'utf8').toString(
      'base64',
    );

    console.log(converted);
    if (needToMakeSecretFile) {
      fs.writeFile(
        `secret-${moment().format('YYYYMMDD')}.json`,
        converted,
        'utf8',
        err => {
          console.log(`write file error: ${err}`);
        },
      );
    }

    return converted;
  }

  static decrypt(secretsInBase64) {
    // Base64 Decoding
    const base64DecodedText = Buffer.from(secretsInBase64, 'base64').toString(
      'utf8',
    );
    // console.log('Base64 Decoded Text : ', base64DecodedText);

    return JSON.parse(base64DecodedText);
  }
}

module.exports = GithubSecretHelper;
