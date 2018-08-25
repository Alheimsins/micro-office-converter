const { readdir, readFile } = require('fs').promises
const md = require('markdown-it')()
const { send } = require('micro')
const createDirectories = require('./create-directories')
const cleanup = require('./cleanup')
const convert = require('./convert')

exports.frontpage = async (request, response) => {
  const readme = await readFile('README.md', 'utf-8')
  send(response, 200, md.render(readme))
}

exports.convert = async (request, response) => {
  const { format } = request.params
  let cleanupOptions = {
    files: [],
    directories: []
  }
  if (!request.files) {
    send(response, 500, new Error('Missing required input: file'))
  } else {
    const file = request.files.file
    const dirs = await createDirectories()
    cleanupOptions.directories.push(dirs.inputDirectory)
    cleanupOptions.directories.push(dirs.outputDirectory)
    const inFilePath = `${dirs.inputDirectory}/${file.name}`
    await file.mv(inFilePath)
    cleanupOptions.files.push(inFilePath)
    const options = {
      format: format,
      file: inFilePath
    }
    const settings = Object.assign({}, options, dirs)
    const { stdout, stderr } = await convert(settings)
    console.log(stdout)
    console.log(stderr)
    const convertedList = await readdir(dirs.outputDirectory)
    const outFilePath = `${dirs.outputDirectory}/${convertedList[0]}`
    const outFile = await readFile(outFilePath)
    cleanupOptions.files.push(outFilePath)
    await cleanup(cleanupOptions)
    send(response, 200, outFile)
  }
}
