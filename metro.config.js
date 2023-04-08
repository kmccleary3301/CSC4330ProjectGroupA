const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  ...defaultConfig,
  transformer: {
    ...defaultConfig.transformer,
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
    minifierConfig: {
      ...defaultConfig.transformer.minifierConfig,
      sourceMap: false,
    },
  },
  resolver: {
    ...defaultConfig.resolver,
    sourceExts: [...defaultConfig.resolver.sourceExts, 'css'],
  },
  server: {
    ...defaultConfig.server,
    enhanceMiddleware: (middleware) => {
      return (req, res, next) => {
        if (req.url.startsWith('/node_modules')) {
          res.set('Cache-Control', 'public, max-age=31536000');
        }
        return middleware(req, res, next);
      };
    },
  },
  watchFolders: [
    ...defaultConfig.watchFolders,
    // Add the root directory of your linked packages (assuming they are in a folder named 'packages')
    // path.resolve(__dirname, '..', 'packages'),
  ],
};
