const util = require('util')
const glob = util.promisify(require('glob'))
const upimg = require('upimg')
const ora = require('ora')
const chalk = require('chalk')

const Conf = require('conf')
const conf = new Conf({
  configName: 'upimg',
  projectName: 'upimg',
})

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
    let spinner = ora(`Uploading ${file}`)
    if (!commander.raw) {
      spinner.start()
    }
    await api.upload(file)
      .then(json => {
        if (json.success) {
          if (!commander.raw) {
            spinner.succeed(chalk.underline(json.url) + ' ' + chalk.gray(`(${file})`))
          } else {
            console.log(json.url)
          }
        } else {
          if (!commander.raw) {
            spinner.fail(chalk.red(json.message) + ' ' + chalk.gray(`(${file})`))
          } else {
            console.log(`${json.message} (${file})`)
          }
        }
      })
      .catch(err => {
        spinner.fail(chalk.red(err.message) + ' ' + chalk.gray(`(${file})`))
      })
  }
}
