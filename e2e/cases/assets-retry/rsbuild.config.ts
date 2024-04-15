import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginAssetsRetry } from '@rsbuild/plugin-assets-retry';

let counter = 1;

export default defineConfig({
  plugins: [pluginReact(), pluginAssetsRetry()],
  dev: {
    hmr: false,
    liveReload: false,
    writeToDisk: true,
    setupMiddlewares: [
      (middlewares, _server) => {
        middlewares.unshift((req, res, next) => {
          if (req.url?.startsWith('/static/js/async')) {
            if (counter % 10 !== 0) {
              res.statusCode = 404;
            }
            counter++;
            res.setHeader('block-async', JSON.stringify(counter));
          }
          next();
        });
      },
    ],
  },
  output: {
    minify: false,
  },
});
