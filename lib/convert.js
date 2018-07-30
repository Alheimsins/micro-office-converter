const util = require('util')
const exec = util.promisify(require('child_process').exec)
const getLibrePath = require('./get-libre-path')

module.exports = async options => {
  const libre = getLibrePath()
  if (libre.error !== false) {
    throw libre.error
  }
  const cmd = `${libre.path} --headless --convert-to ${options.format} ${options.file}`
  const { stdout, stderr } = await exec(cmd)
  console.log('stdout:', stdout)
  console.log('stderr:', stderr)
}