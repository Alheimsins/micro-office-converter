const { readdir, readFile } = require('fs').promises
const AdmZip = require('adm-zip')
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
  const cleanupOptions = {
    files: [],
    directories: []
  }
  if (!request.files) {
    send(response, 400, new Error('Missing required input: file'))
  } else if (!format) {
    send(response, 400, new Error('Missing required input: format'))
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
    if (stderr.toString().trim() !== '') {
      console.log(`Got errors - ${stderr}`)
      await cleanup(cleanupOptions)
      send(response, 500, new Error(stderr.toString().trim()))
    } else {
      console.log('Got no errors')
      console.log(stdout)
      const convertedList = await readdir(dirs.outputDirectory)
      const outFilePaths = convertedList.map(file => `${dirs.outputDirectory}/${file}`)
      if (convertedList.length > 1) {
        console.log('Got multiple files')
        const zip = new AdmZip()
        zip.addLocalFolder(dirs.outputDirectory)
        cleanupOptions.files.push(...outFilePaths)
        await cleanup(cleanupOptions)
        send(response, 200, zip.toBuffer())
      } else {
        const outFile = await readFile(outFilePaths[0])
        cleanupOptions.files.push(...outFilePaths)
        await cleanup(cleanupOptions)
        send(response, 200, outFile)
      }
    }
  }
}
