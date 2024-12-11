// const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://facebook.github.io/metro/docs/configuration
//  *
//  * @type {import('metro-config').MetroConfig}
//  */
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);



// // metro.config.js
// // const { getDefaultConfig } = require("expo/metro-config"); // For Expo projects
// const reanimated = require("react-native-reanimated/metro-config"); // For React Native projects

// const config = reanimated(getDefaultConfig(__dirname));

// // Ensure the `.cjs` file extension is supported for Reanimated
// config.resolver.assetExts.push("cjs");

// module.exports = config;




const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

const config = {
  // Example: Adding custom asset types
  transformer: {
    assetPlugins: ['some-asset-plugin'], // Replace with any plugin you need
  },
  resolver: {
    // Custom resolution logic if required
    resolveRequest: (context, moduleName, platform) => {
      // Custom resolution logic
    },
  },
};

module.exports = wrapWithReanimatedMetroConfig(config);
