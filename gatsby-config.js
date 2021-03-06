const path = require(`path`)

module.exports = {
  // pathPrefix: `/`,

  siteMetadata: {
    siteTitle: `AGR Pro Docs`,
    defaultTitle: `AGR Pro`,
    siteTitleShort: `AGR Pro`,
    siteDescription: `Documentation for AGR Pro`,
    siteUrl: `https://agrpro.github.io`,
    siteAuthor: `https://agrpro.github.io`,
    siteImage: `/banner.jpg`,
    siteLanguage: `en`,
    themeColor: `#8257E6`,
    basePath: `/`,
  },
  flags: { PRESERVE_WEBPACK_CACHE: true },
  plugins: [
    {
      resolve: `@mklabs/gatsby-theme-docs`,
      options: {
        configPath: `src/config`,
        docsPath: `src/docs`,
        repositoryUrl: `https://github.com/AGRPRO/agrpro.github.io`,
        branch: 'dev',
        baseDir: ``,
        withMdx: false,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `AGR Pro Documentation`,
        short_name: `AGR Pro Docs`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `standalone`,
        icon: `static/favicon.jpg`,
      },
    },
    
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `api`,
        path: path.join(__dirname, `src/AGRProAPI`),
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `api`,
        path: path.join(__dirname, `static`),
      },
    },

    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-embedder`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              withWebp: true,
              wrapperStyle: 'max-width: 960px; margin-left: initial',
              linkImagesToOriginal: true,
            },
          },
          `gatsby-remark-responsive-iframe`,
          `gatsby-remark-copy-linked-files`,
        ],
        plugins: [`gatsby-remark-autolink-headers`, `gatsby-remark-images`],
      }
    },

    `gatsby-plugin-sitemap`,
    
    `gatsby-transformer-sharp`, 
    `gatsby-plugin-sharp`,

    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          process.env.GOOGLE_ANALYTICS_ID,
        ],
        gtagConfig: {
          optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          respectDNT: true,
        },
      },
    },

    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://agrpro.github.io/AGRPro-documentation`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
