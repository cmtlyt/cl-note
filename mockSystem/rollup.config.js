import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  input: 'src/index.ts',
  output: {
    file: 'dist/mock-system.js',
    format: 'umd',
    name: 'mockSystem',
    exports: 'named',
    esModule: true,
  },
  plugins: [
    copy({
      targets: [
        { src: 'dist/mock-system.js', dest: '../public' },
        { src: 'staticFile/*', dest: '../public' },
        { src: 'dist/types/api.d.ts', dest: '../src/types' },
      ],
    }),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    terser(),
  ],
});
