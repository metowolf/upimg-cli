import upimg from 'upimg'
import inquirer from 'inquirer'
import chalk from 'chalk'
import Conf from 'conf'

const conf = new Conf({
  configName: 'upimg',
  projectName: 'upimg'
})

const setServer = async () => {
  const servers = Object.keys(upimg).filter(x => upimg[x].deprecated !== true)
  const answer = await inquirer.prompt([
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
  const options = conf.get(`options-${server}`, {})

  const question = []
  for (const keyname of Object.keys(upimg[server].options)) {
    question.push({
      type: 'input',
      name: keyname,
      message: `Input ${chalk.green(keyname)} of ${server}`,
      default: options[keyname] || upimg[server].options[keyname]
    })
  }

  const answer = await inquirer.prompt(question)
  conf.set(`options-${server}`, answer)

  return answer.cookie
}

export default async () => {
  const server = await setServer()
  await setOptions(server)
}
