const fs = require('fs')
const path = require('path')

const LIBRE_PATHS = (platform => {
  switch (platform) {
    case 'darwin':
      return ['/Applications/LibreOffice.app/Contents/MacOS/soffice']
    case 'linux':
      return ['/usr/bin/libreoffice', '/usr/bin/soffice']
    case 'win32':
      return [path.join(process.env['PROGRAMFILES(X86)'], 'LIBREO~1/program/soffice.exe')]
  }
})(process.platform)

function findLibre (paths) {
  for (let i = 0; i < paths.length; i++) {
    if (paths[i] && fs.existsSync(paths[i])) {
      return paths[i]
    }
  }
}

module.exports = () => {
  const libre = {
    error: false,
    path: false
  }

  if (!LIBRE_PATHS) {
    libre.error = new Error('Operating system not yet supported: ' + process.platform)
  }

  const librePath = findLibre(LIBRE_PATHS)

  if (!librePath) {
    libre.error = new Error('Could not find LibreOffice binary')
  } else {
    libre.path = librePath
  }

  return libre
}
