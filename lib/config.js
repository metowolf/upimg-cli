const upimg = require('upimg')
const inquirer = require('inquirer')
const chalk = require('chalk')

const Conf = require('conf')
const conf = new Conf()

const setServer = async () => {
  let servers = Object.keys(upimg)
    .filter(x => x !== 'qihoo')

  let answer = await inquirer.prompt([
    {
      type: 'list',
			name: 'server',
			message: 'Select CDN server',
			choices: servers
				.map(server => ({
					name: upimg[server].headers.Cookie !== undefined ? `${server} ${chalk.grey('(require cookie)')}` : server,
					value: server
        })),
      default: conf.get('server', 'alibaba')
    }
  ])
  conf.set('server', answer.server)

  return answer.server
}

const setCookie = async server => {
  let answer = await inquirer.prompt([
    {
      type: 'input',
			name: 'cookie',
			message: `Input cookie of ${server}`,
      default: conf.get(`cookie-${server}`, '')
    }
  ])
  conf.set(`cookie-${server}`, answer.cookie)

  return answer.cookie
}

module.exports = async () => {

  let server = await setServer()

  if (upimg[server].headers.Cookie !== undefined) {
    await setCookie(server)
  }

}
