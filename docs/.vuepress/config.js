module.exports = {
  title: 'in2iframeconsent',
  description: 'in2iframeconsent is a TYPO3 consent management solution developed by in2code to load iFrames only after a page visitor\'s consent.',
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: '/logo-in2code-small.png',
    lastUpdated: 'Last updated',
    repo: 'https://github.com/in2code-de/in2iframeconsent',
    docsRepo: 'https://github.com/in2code-de/in2iframeconsent',
    docsBranch: 'develop',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Recommend a change',
    navbar: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Learn',
        children: [
          {
            text: 'Whats in2iframeconsent?',
            link: '/guide/#what-is-in2iframeconsent'
          },
          {
            text: 'Getting started',
            link: '/guide/#getting-started'
          },
          {
            text: 'Configuration',
            link: '/guide/#configuration'
          },
          {
            text: 'Contributing',
            link: '/contributing/#contributing'
          },
        ]
      },
      {
        text: 'Examples',
        children: [
          {
            text: 'Dynamic imports',
            link: '/examples/#dynamic-import'
          },
        ]
      },
      {
        text: 'Contact',
        children: [
          {
            text: 'Homepage',
            link: 'https://www.in2code.de/en/'
          },
          {
            text: 'Twitter',
            link: 'https://twitter.com/in2code_de'
          },
          {
            text: 'Email',
            link: 'mailto:felix.ranesberger@in2code.de'
          }
        ]
      },
    ],
    plugins: [
        '@vuepress/active-header-links',
    ],
  }
}
