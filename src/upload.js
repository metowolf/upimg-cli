import { promisify } from 'util'
import glob from 'glob'
import upimg from 'upimg'
import ora from 'ora'
import chalk from 'chalk'

const pGlob = promisify(glob)

const Conf = require('conf')
const conf = new Conf({
  configName: 'upimg',
  projectName: 'upimg'
})

const parseGlob = async (files) => {
  const result = []
  for (const file of files) {
    const t = await pGlob(file)
    result.push(...t)
  }
  return result
}

export default async (commander) => {
  const files = await parseGlob(commander.args)

  const server = commander.server || conf.get('server', 'alibaba')
  let api = upimg[server]

  const options = conf.get(`options-${server}`, {})

  for (const keyname of Object.keys(upimg[server].options)) {
    if (options[keyname] !== undefined) {
      api = api.set(keyname, options[keyname])
    }
  }

  for (const file of files) {
    const spinner = ora(`Uploading ${file}`)
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
