const Utils = require('./utils');
const HermesPoster = require('./HermesPoster');

const hp = new HermesPoster();
hp.run();

module.exports = {
  HermesPoster,
  Utils,
};
