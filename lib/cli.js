#!/usr/bin/env node

const commander = require('commander')
const config = require('./config')
const upload = require('./upload')
const package = require('../package.json')

commander
  .version(package.version)
  .option('-c, --config', 'Setting default CDN server & cookie')
  .option('-s, --server [server]', 'Upload throuth a given CDN server')
  .option('-r, --raw', 'Raw output')
  .parse(process.argv)

if (commander.config) {
  return config()
}

if (commander.args.length) {
  return upload(commander)
}
