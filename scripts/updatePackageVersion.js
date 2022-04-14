const fs = require('fs')

const newVersionNumber = process.argv[2]

function checkVersionGiven() {
  if (newVersionNumber === undefined) {
    process.exit(22)
  }
}

function updatePackageVersion(fpath) {
  console.log('🚀 Atualizando versão package.json ✨')

  checkVersionGiven()
  let packageJson = fs.readFileSync(fpath)
  packageJson = JSON.parse(packageJson)
  packageJson.version = newVersionNumber.replace(/v/g, '')

  fs.writeFileSync(fpath, JSON.stringify(packageJson, null, 2))
}

updatePackageVersion('./package.json')

module.exports = updatePackageVersion
