import { cp } from 'fs'
import { exec } from 'child_process'

const apps = ['main', 'micro-dashboard', 'micro-data-management']

exec('pnpm build', () => {
  apps.forEach((app) =>
    cp(
      `./apps/${app}/dist/`,
      `./dist/${app}/`,
      {
        recursive: true
      },
      (err) => err
    )
  )
})
