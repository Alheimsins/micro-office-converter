const createDirectories = require('./lib/create-directories')
const convert = require('./lib/convert')

module.exports = async options => {
  const dirs = await createDirectories()
  const settings = Object.assign({}, options, dirs)
  const { stdout, stderr } = await convert(settings)
  return {stdout, stderr}
}
