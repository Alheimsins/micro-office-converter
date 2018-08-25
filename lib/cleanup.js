const { rmdir, unlink } = require('fs').promises

module.exports = async options => {
  await Promise.all(options.files.map(unlink))
  console.log('All temporary files removed')
  await Promise.all(options.directories.map(rmdir))
  console.log('All temporary directories removed')
  console.log('Everything is cleaned up')
  return true
}
