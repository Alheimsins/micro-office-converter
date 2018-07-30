const createDirs = require('./lib/create-directories')

/*
const convert = require('./lib/convert')
const options = {
  format: 'png',
  file: '../../../Downloads/myfile.pdf'
}

convert(options)
*/
async function mkdirs () {
  const dirs = await createDirs()
  console.log(dirs)
}

mkdirs()