import fs from 'node:fs/promises'
import express from 'express'

const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

const templateHtml = await fs.readFile('./dist/client/index.html', 'utf-8')
// const ssrManifest = await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')

const app = express()
const compression = (await import('compression')).default
const sirv = (await import('sirv')).default
app.use(compression())
app.use(base, sirv('./dist/client', {extensions: []}))

app.use('*', async (req, res) => {
    try {
        // const url = req.originalUrl.replace(base, '')
        const template = templateHtml
        const {render} = (await import('./dist/server/entry-server.mjs'))
        const rendered = await render('Fr-5500191', 77404)
        const script = `<script>window.__productDetailInitialState__ = ${JSON.stringify(rendered.productData).replace(/</g, '\\u003c')}</script>`
        const html = template
            .replace(`<!--app-head-->`, `${script}` ?? '')
            .replace(`<!--app-html-->`, rendered.html ?? '')

        res.status(200).set({'Content-Type': 'text/html'}).end(html);

    } catch (e) {
        console.log(e.stack)
        res.status(500).end(e.stack)
    }
})

// Start http server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})