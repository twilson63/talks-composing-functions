import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import livereload from 'rollup-plugin-livereload'

export default {
  input: 'src/main.js',
  output: {
    format: 'iife',
    file: 'public/bundle.js',
    name: 'playground'
  },
  plugins: [
    resolve(),
    commonjs(),
    livereload('public')
  ]
}
