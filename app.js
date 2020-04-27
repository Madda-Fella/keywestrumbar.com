require('dotenv').config({ silent: true })

const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')
const sugarml = require('sugarml')
const sugarss = require('sugarss')
const SpikeDatoCMS = require('spike-datocms')
const locals = {}
const env = process.env.SPIKE_ENV

module.exports = {
  devtool: 'source-map',
  matchers: { html: '*(**/)*.sgr', css: '*(**/)*.sss' },
  ignore: ['**/layout.sgr', '**/_*', '**/.*', 'readme.md', 'yarn.lock', 'package-lock.json'],
  reshape: htmlStandards({
    parser: sugarml,
    root: './views',
    locals: (ctx) => { return Object.assign(locals, { pageId: pageId(ctx) }) },
    minify: env === 'production'
  }),
  postcss: cssStandards({
    parser: sugarss,
    minify: env === 'production',
    warnForDuplicates: env !== 'production'
  }),
  babel: jsStandards(),
  // server: {open: false},
  plugins: [
    new SpikeDatoCMS({
      addDataTo: locals,
      token: process.env.DATO_CMS_READ_ONLY,
      models: [
        {
          name: 'hp_about',
        },
        {
          name: 'hp_event',
        },
        {
          name: 'hp_rum_guide',
        },
        {
          name: 'hp_gallery',
        },
        {
          name: 'address',
        },
        {
          name: 'hours_of_op',
        },
      ],
      json: 'data.json'
    })
  ]
}
