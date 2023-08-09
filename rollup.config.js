import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/index.ts',
    external: [],
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      json(),
      terser({
        format: {
          comments: false,
        },
      }),
    ],
    output: {
      file: 'dist/index.js',
      format: 'cjs'
    }
  }
];
