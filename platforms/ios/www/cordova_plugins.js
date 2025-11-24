cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-dengage.DengageCR",
      "file": "plugins/cordova-plugin-dengage/www/Dengage.js",
      "pluginId": "cordova-plugin-dengage",
      "clobbers": [
        "DengageCR"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-add-swift-support": "2.0.2",
    "cordova-plugin-dengage": "1.0"
  };
});