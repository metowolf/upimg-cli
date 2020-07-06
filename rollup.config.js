import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/cli.js',
  output: [
    {
      file: 'dist/cli.js',
      format: 'cjs',
      banner: '#!/usr/bin/env node\n'
    }
  ],
  plugins: [
    json(),
    babel({ babelHelpers: 'bundled' }),
    terser()
  ],
  external: [
    'upimg',
    'commander',
    'inquirer',
    'chalk',
    'conf',
    'util',
    'glob',
    'ora'
  ]
}
