const makeDir = require('make-dir')
const { tmpdir } = require('os')
const uuid = require('uuid-random')

module.exports = async () => {
  const tmp = tmpdir()
  const inDirId = uuid()
  const outDirId = uuid()
  try {
    const [inputDirectory, outputDirectory] = await Promise.all([makeDir(`${tmp}/${inDirId}`), makeDir(`${tmp}/${outDirId}`)])
    return {
      inputDirectory,
      outputDirectory,
      tmp,
      inDirId,
      outDirId
    }
  } catch (error) {
    throw error
  }
}
