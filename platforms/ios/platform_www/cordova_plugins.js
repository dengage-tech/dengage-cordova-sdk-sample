cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-dengage.Dengage",
      "file": "plugins/cordova-plugin-dengage/www/Dengage.js",
      "pluginId": "cordova-plugin-dengage",
      "clobbers": [
        "Dengage"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-add-swift-support": "2.0.2",
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-dengage": "1.0"
  };
});