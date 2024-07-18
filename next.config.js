const withFonts = require('next-fonts');
const withImages = require('next-images');
const withTM = require('next-transpile-modules')([
  '@react95/core',
  '@react95/icons',
]);

const nextConfig = {
  images: {
    disableStaticImages: true,
  },
};

module.exports = {
  exportTrailingSlash: true,
  // If your repository name is different, update the basePath accordingly
  basePath: '/NEXTJS_TEMPLATE',
  assetPrefix: '/NEXTJS_TEMPLATE/',
};

module.exports = withTM(withFonts(withImages(nextConfig)));
