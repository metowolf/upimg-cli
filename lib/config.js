const upimg = require('upimg')
const inquirer = require('inquirer')
const chalk = require('chalk')

const Conf = require('conf')
const conf = new Conf({
  configName: 'upimg',
  projectName: 'upimg',
})

const setServer = async () => {
  let servers = Object.keys(upimg)
  let answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'server',
      message: 'Select CDN server',
      choices: servers
        .map(server => ({
          name: server,
          value: server
        })),
      default: conf.get('server', 'alibaba')
    }
  ])
  conf.set('server', answer.server)

  return answer.server
}

const setOptions = async server => {

  let options = conf.get(`options-${server}`, {})

  let question = []
  for (let keyname of Object.keys(upimg[server].options)) {
    question.push({
      type: 'input',
      name: keyname,
      message: `Input ${chalk.green(keyname)} of ${server}`,
      default: options[keyname] || upimg[server].options[keyname]
    })
  }

  let answer = await inquirer.prompt(question)
  conf.set(`options-${server}`, answer)

  return answer.cookie
}

module.exports = async () => {
  let server = await setServer()
  await setOptions(server)
}
