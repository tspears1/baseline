import { defineConfig } from 'vite'
import path, { extname } from 'path'
import ViteRestart from 'vite-plugin-restart'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import babel from 'vite-plugin-babel'

export default defineConfig(async ({ command }) => {
  const config = {
    build: {
      manifest: true,
      outDir: 'web/dist',
      assetsDir: '.',
      rollupOptions: {
        input: [
          'assets/js/main.js'
        ]
      },
      target: 'esnext'
    },
    resolve: {
      alias: {
        '@styles': path.resolve(__dirname, 'assets/styles'),
        '@js': path.resolve(__dirname, 'assets/js'),
        '@svgs': path.resolve(__dirname, 'assets/svgs')
      }
    },
    plugins: [
      babel({
        babelConfig: {
          babelrc: false,
          configFile: false,
          plugins: [
            ['@babel/plugin-proposal-decorators', {
              version: '2018-09',
              decoratorsBeforeExport: true
            }],
            ['@babel/plugin-proposal-class-properties'],
            ['@babel/plugin-transform-private-methods']
          ],
          presets: [
            ['@babel/preset-react']
          ]
        }
      }),
      ViteRestart({
        reload: [
          'templates/**/*',
          'assets/styles/**/*'
        ]
      }),
      viteStaticCopy({
        targets: [
          {
            src: 'assets/svgs/*',
            dest: 'icon-picker'
          },
          {
            src: 'assets/styles/base/_custom-properties.scss',
            dest: 'variables'
          }
        ]
      })
    ]
  }

  return config
})
