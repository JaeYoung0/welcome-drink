const withPWA = require("next-pwa");
const withPlugins = require("next-compose-plugins");

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPlugins(
  [
    // WHY...withPWA 때문에 prd 환경에서 build error 발생...
    // [
    //   withPWA({
    //     pwa: {
    //       dest: "public",
    //       register: true,
    //       skipWaiting: true,
    //       sw: "/sw.js",
    //     },
    //   }),
    // ],
  ],
  nextConfig
);
