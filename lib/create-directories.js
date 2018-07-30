const makeDir = require('make-dir')
const { tmpdir } = require('os')
const uuid = require('uuid/v4')

module.exports = async () => {
  const tmp = tmpdir()
  try {
    const [indir, outdir] = await Promise.all([makeDir(`${tmp}/${uuid()}`), makeDir(`${tmp}/${uuid()}`)])
    return {indir, outdir}
  } catch (error) {
    throw error
  }
}
