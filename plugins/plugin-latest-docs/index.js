module.exports = function (context, options) {
  return {
    name: "docusaurus-latest-docs-plugin",
    async loadContent() {
      return 1 + Math.floor(Math.random() * 10);
    },
    async contentLoaded({ content, actions }) {
    },
  };
};
