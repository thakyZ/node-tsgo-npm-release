#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const { spawnSync } = require('child_process')

const platform = process.platform
const arch = process.arch

const archMap = {
  x64: 'amd64',
  ia32: '386',
  arm: 'arm',
  arm64: 'arm64',
}

const ext = platform === 'win32' ? '.exe' : ''

const binaryName = `tsgo-${platform}-${archMap[arch]}${ext}`

const binaryPath = path.join(__dirname, 'bin', binaryName)

if (!fs.existsSync(binaryPath)) {
  console.error(
    `Not found binary file for current platform (${platform}-${arch})`,
  )
  process.exit(1)
}

if (platform !== 'win32') {
  try {
    fs.chmodSync(binaryPath, 0o755)
  } catch (err) {
    console.error(`Error setting executable permission for binary file:`, err)
  }
}

const result = spawnSync(binaryPath, process.argv.slice(2), {
  stdio: 'inherit',
})

process.exit(result.status)
