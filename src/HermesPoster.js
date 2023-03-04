const DeliveryManager = require('./poster/delivery-manager');

class HermesPoster {
  static run() {
    const deliveryManager = new DeliveryManager(
      'action-secret-test.conf',
      'action-articles-test.conf',
    );
    deliveryManager.deliver();
  }
}

module.exports = HermesPoster;
