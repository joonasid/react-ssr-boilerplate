import config from '../config'

const { client: { assets } } = config
const assetPaths = Object.keys(assets).map(key => assets[key])

const cssTags = assetPaths
  .filter(path => path.includes('.css'))
  .map(link => `<link rel="subresource stylesheet" type="text/css" href="/${link}" as="style" />`).join('\n')

const scriptTags = assetPaths
  .filter(path => path.includes('.js'))
  .map(script => `<script src="/${script}" type="text/javascript" defer></script>`).join('\n')

const getInitialStateTag = state => `<script type="application/json" id="initialState" defer>${JSON.stringify(state)}</script>`

const pre = (page, state) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${page.title}</title>
    <meta name="description" content="${page.description}">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="React SSR boilerplate">
    <meta property="og:title" content="${page.title}">
    <meta property="og:description" content="${page.description}">
    <meta property="og:url" content="${page.url}">
    ${page.previewImage ? `<meta property="og:image" content="${page.previewImage}">` : ''}
    <link rel="canonical" href="${page.canonicalUrl || page.url}">
    ${config.env === 'development' ? `<script src="/reload/reload.js"></script>` : ''}
    <link rel="manifest" href="/public/manifest.json">
    <link rel="shortcut icon" href="/public/favicon.ico">
    ${getInitialStateTag(state)}
    ${cssTags}
    ${scriptTags}
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app!</noscript>
    <div id="root">`

const post = `</div></body></html>`

export default {
  pre,
  post
}