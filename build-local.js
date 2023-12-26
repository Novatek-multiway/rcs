import { cp } from 'fs'
import { exec } from 'child_process'

const apps = ['main', 'micro-dashboard', 'micro-data-management']

exec('sudo pnpm build', () => {
  apps.forEach((app) =>
    cp(
      `./apps/${app}/dist/`,
      app.includes('micro') ? `./dist/module/${app}/` : `./dist/${app}/`,
      {
        recursive: true
      },
      (err) => err
    )
  )
})
