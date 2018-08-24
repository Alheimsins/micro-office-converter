const converter = require('./index')

const options = {
  format: 'xhtml',
  file: '../../../Downloads/digital-strategi.pdf'
}

async function convert (options) {
  const { stdout, stderr } = await converter(options)
  console.log(stdout)
  console.log(stderr)
}

convert(options)
