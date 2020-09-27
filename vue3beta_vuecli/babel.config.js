module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ["import", {
      libraryName: "@csii/vx-mobile",
      libraryDirectory: "components"
    }]
  ]
}
