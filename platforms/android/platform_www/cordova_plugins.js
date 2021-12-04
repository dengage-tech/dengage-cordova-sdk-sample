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
    "cordova-plugin-dengage": "1.0"
  };
});