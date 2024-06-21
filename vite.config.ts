import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import UnoCSS from 'unocss/vite';
// @ts-expect-error 找不到类型
import viteEslint from 'vite-plugin-eslint';
import viteStylelint from 'vite-plugin-stylelint';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import legacy from '@vitejs/plugin-legacy';
import { visualizer } from 'rollup-plugin-visualizer';

import { injectGlobalVariabel } from './plugins/injectGlobalVariabel';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/cl-note/',
  plugins: [
    react({
      jsxImportSource: 'jotai-signal',
      tsDecorators: true,
    }),
    UnoCSS(),
    viteEslint(),
    viteStylelint({
      exclude: ['node_modules'],
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, 'src/assets/svg-icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
    chunkSplitPlugin({
      customSplitting: {
        'react-vendor': [/\/react(-router)?(-dom)?\//],
      },
    }),
    legacy({}),
    visualizer({}),
    injectGlobalVariabel({}),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@comp': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'antd'],
  },
  envPrefix: 'CL_',
  css: {
    modules: {
      generateScopedName: '[name]__[local]--[hash:base64:8]',
    },
  },
});
