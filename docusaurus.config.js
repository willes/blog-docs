const path = require('path')

const lightCodeTheme = require('prism-react-renderer/themes/dracula');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const tailwindPlugin = require('./plugins/tailwind-plugin.cjs');
const latestDocs =  require('./plugins/plugin-latest-docs')

const plugins = [
  tailwindPlugin,
  latestDocs,
  [
    path.resolve(__dirname, './plugins/plugin-content-blog'), // 为了实现全局 blog 数据，必须改写 plugin-content-blog 插件

    {
      routeBasePath: "lifestyle",
      path: "./lifestyle",
      editLocalizedFiles: false,
      blogDescription: '代码人生',
      blogSidebarCount: 10,
      blogSidebarTitle: ' ',
      postsPerPage: 10,
      showReadingTime: true,
      readingTime: ({ content, frontMatter, defaultReadingTime }) =>
      defaultReadingTime({ content, options: { wordsPerMinute: 300 } })
    },
  ],
];

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'handday Documentation',
  url: 'https://c.handday.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'handday',
  projectName: 'handday',
  i18n: {
    defaultLocale: "zh",
    locales: ["zh"],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsible: false,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins,
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'handday',
        logo: {
          alt: 'Docs Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'search',
            position: 'right',
          },
          {
            to: '/',
            label: '首页',
            position: 'right',
            // Anything that isn't `extend`, `'internal`, or contain a slash.
            // Account for local 2-char code at the start.
            activeBaseRegex: '^(\/[a-z][a-z])?\/(?!(extend\/?|internal\/?|team\/?|lifestyle?)$).*',
          },
          {
            to: 'extend',
            label: '文档',
            position: 'right',
          },
          {
            to: '/lifestyle',
            label: '内部',
            position: 'right',
            activeBasePath: `lifestyle`,
          },
          {
            href: 'http://npm.facehand.cn/',
            label: '私库',
            position: 'right',
          },
          {
            to: '/team',
            label: '团队',
            position: 'right',
          },
          // {
          //   type: 'dropdown',
          //   label: 'Flarum',
          //   position: 'right',
          //   items: [

          //     {
          //       href: 'https://flarum.org/',
          //       label: 'Home'
          //     },
          //     {
          //       href: 'https://discuss.flarum.org/',
          //       label: 'Community'
          //     },
          //     {
          //       href: 'https://github.com/flarum/framework',
          //       label: 'GitHub'
          //     },
          //   ]
          // },
          // {
          //   type: 'localeDropdown',
          //   position: 'right',
          // },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} handday`,
      },
      prism: {
        additionalLanguages: [],
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        appId: 'QHP1YG60G0',
        apiKey: 'dcfd7f09bbede3329311afd89da074b7',
        indexName: 'flarum',
        contextualSearch: true,
      }
    }),
});
