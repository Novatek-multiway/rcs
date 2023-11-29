const { exec } = require('child_process')
const { cp } = require('fs')

const apps = ['main', 'micro-dashboard', 'micro-data-management']

exec('sudo pnpm build', (error) => {
  if (error) {
    console.error(error)
    return
  }
  // 将打包的产物放到dist/${app}目录下
  apps.forEach((app) => {
    cp(`apps/${app}/dist`, `dist/${app}`, () => {
      console.log(`copy ${app} success`)
    })
  })
})
