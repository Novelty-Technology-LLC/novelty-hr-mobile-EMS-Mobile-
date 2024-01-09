const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const MetroConfig = require('@ui-kitten/metro-config');
const defaultConfig = require('metro-config/src/defaults').getDefaultValues();

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

const evaConfig = {
  evaPackage: '@eva-design/eva',
};

const config = MetroConfig.create(evaConfig, {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
});

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
