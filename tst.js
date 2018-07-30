const converter = require('./index')

const options = {
  format: 'png',
  file: '../../../Downloads/myfile.pdf'
}

async function convert (options) {
  const { stdout, stderr } = await converter(options)
  console.log(stdout)
  console.log(stderr)
}

convert(options)
