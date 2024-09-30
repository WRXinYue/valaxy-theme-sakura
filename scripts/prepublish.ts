import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import consola from 'consola'

const rootFolder = path.join(process.cwd())

const filesToCopy = ['README.md', 'README.zh-CN.md']
const destinationFolder = path.join(rootFolder, 'theme')

if (!fs.existsSync(destinationFolder)) {
  fs.mkdirSync(destinationFolder, { recursive: true })
}

filesToCopy.forEach((file) => {
  const sourcePath = path.join(rootFolder, file)
  const destinationPath = path.join(destinationFolder, file)
  fs.copyFileSync(sourcePath, destinationPath)
  consola.success(`Copied ${file} to ${destinationFolder}`)
})
