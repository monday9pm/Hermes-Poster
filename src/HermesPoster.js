const DeliveryManager = require('./poster/delivery-manager');

class HermesPoster {
  constructor(
    secretConfigFileName = 'action-secret.conf',
    articleConfigFileName = 'action-articles.conf',
    baseImageDirPath = null,
  ) {
    this.secretConfigFileName = secretConfigFileName;
    this.articleConfigFileName = articleConfigFileName;
    this.baseImageDirPath = baseImageDirPath;
  }

  run() {
    const deliveryManager = new DeliveryManager(
      this.secretConfigFileName,
      this.articleConfigFileName,
      this.baseImageDirPath,
    );
    console.log('HermesPoster :: running');
    deliveryManager.deliver();
  }
}

module.exports = HermesPoster;
