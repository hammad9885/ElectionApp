const appJson = require('./app.json');

const localApiUrl = 'http://192.168.110.10:8000/api/v1';

module.exports = () => ({
  ...appJson.expo,
  assetBundlePatterns: ['**/*'],
  extra: {
    ...appJson.expo.extra,
    apiBaseUrl: process.env.EXPO_PUBLIC_API_URL || localApiUrl,
  },
});
