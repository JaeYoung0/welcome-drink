const withPWA = require("next-pwa");
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([
  [
    withPWA({
      pwa: {
        dest: "public",
        register: true,
        skipWaiting: true,
        sw: "/sw.js",
      },
    }),
  ],
]);
