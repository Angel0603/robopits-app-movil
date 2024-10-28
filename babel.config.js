module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      "module:metro-react-native-babel-preset"
    ],
    plugins: [
      ["@babel/plugin-proposal-private-methods", { "loose": true }],
      ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
      "nativewind/babel"
    ],
  };
};
