const makeDir = require('make-dir')
const { tmpdir } = require('os')
const uuid = require('uuid-random')

module.exports = async () => {
  const tmp = tmpdir()
  const [inputDirectory, outputDirectory] = await Promise.all([makeDir(`${tmp}/${uuid()}`), makeDir(`${tmp}/${uuid()}`)])
  return {
    inputDirectory,
    outputDirectory
  }
}
