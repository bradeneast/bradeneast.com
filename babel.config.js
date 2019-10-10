const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "5",
        firefox: "20",
        chrome: "17",
        safari: "3",
      },
      useBuiltIns: "usage",
    },
  ],
];

module.exports = { presets };