const { unlink } = require('fs').promises

module.exports = async files => {
  await Promise.all(files.map(unlink))
  console.log('Everything is cleaned up')
  return true
}
