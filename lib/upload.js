const util = require('util')
const glob = util.promisify(require('glob'))
const upimg = require('upimg')
const ora = require('ora')
const chalk = require('chalk')

const Conf = require('conf')
const conf = new Conf()

const parseGlob = async (files) => {
  let result = []
  for (let file of files) {
    let t = await glob(file)
    result.push(...t)
  }
  return result
}

module.exports = async (commander) => {

  let files = await parseGlob(commander.args)

  let server = commander.server || conf.get('server', 'alibaba')
  let api = upimg[server]

  let options = conf.get(`options-${server}`, {})

  for (let keyname of Object.keys(upimg[server].options)) {
    if (options[keyname] !== undefined) {
      api = api.set(keyname, options[keyname])
    }
  }

  for (let file of files) {
    let spinner = ora(`Uploading ${file}`).start()
    await api.upload(file)
      .then(json => {
        spinner.succeed(chalk.underline(json.url) + ' ' + chalk.gray(`(${file})`))
      })
      .catch(err => {
        spinner.fail(chalk.red(err.message) + ' ' + chalk.gray(`(${file})`))
      })
  }
}
