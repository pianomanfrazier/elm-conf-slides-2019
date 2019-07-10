const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const emoji = require('markdown-it-emoji');
const sup = require('markdown-it-sup');

module.exports = function(eleventyConfig) {
  // eleventyConfig.addPassthroughCopy('img');
   eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('js');

  /* Markdown Plugins */
  const options = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
    xhtmlOut: true,
  };

  eleventyConfig.setLibrary('md', markdownIt(options)
      .use(emoji)
      .use(sup)
  );

  return {
    templateFormats: [
      'md',
      'njk',
      'html',
    ],

    pathPrefix: '/',

    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: '.',
      includes: '_includes',
      data: '_data',
      output: '_site',
    },
  };
};
