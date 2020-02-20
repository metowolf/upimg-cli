import commander from 'commander'
import config from './config'
import upload from './upload'
import { version } from '../package.json'

const app = () => {
  commander
    .version(version)
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
}

app()
