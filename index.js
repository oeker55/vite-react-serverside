const fs = require('fs').promises;
const express = require('express');

const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

const app = express();

(async () => {
    const templateHtml = await fs.readFile('./dist/client/index.html', 'utf-8');
    const ssrManifest = await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8');

    const compression = require('compression');
    const sirv = require('sirv');

    app.use(compression());
    app.use(base, sirv('./dist/client', { extensions: [] }));

    app.use('*', async (req, res) => {
        try {
            const template = templateHtml;
            const { render } = await import('./dist/server/entry-server.js');
            const rendered = await render('Fr-5500191', 77404);
            const productDataScript = `<script>window.__productDetailInitialState__ = ${JSON.stringify(rendered.productData).replace(/</g, '\\u003c')}</script>`;
            const firmSettingsScript = `<script>window.__firmSettings__ = ${JSON.stringify(rendered.firmSettings).replace(/</g, '\\u003c')}</script>`;
            const html = template
                .replace(`<!--app-head-->`, `${productDataScript} ${firmSettingsScript}` ?? '')
                .replace(`<!--app-html-->`, rendered.html ?? '');

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (e) {
            console.log(e.stack);
            res.status(500).end(e.stack);
        }
    });

    // Start http server
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
})();