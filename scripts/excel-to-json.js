import fs from 'fs'
import path, { dirname } from 'path'
import excelToJson from 'convert-excel-to-json'
import { jsonPaths } from './common.js'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

jsonPaths.forEach((jsonPath) => {
  const filename = jsonPath.match(/\/apps\/(.*)\/src/)[1] + '.xlsx'
  const excelPath = path.join(__dirname, filename)

  try {
    const result = excelToJson({
      sourceFile: excelPath
    })
    const [, { A: jsonFilePath }, keyMap, ...data] = result['Sheet 1']
    const list = data.map((row) => Object.fromEntries(Object.entries(row).map(([key, value]) => [keyMap[key], value])))
    const json = Object.fromEntries(
      list.map((item) => [
        item.zh,
        {
          en: item.en,
          $files: item.$files.split(','),
          jp: item.jp,
          kor: item.kor
        }
      ])
    )
    fs.writeFileSync(path.join(__dirname, '../', jsonFilePath), JSON.stringify(json, null, 2))
    console.log('Excel file converted to JSON:', jsonFilePath)
  } catch (error) {
    console.error('Error parsing Excel file:', excelPath, error)
  }
})
