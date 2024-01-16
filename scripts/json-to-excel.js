import fs from 'fs'
import path from 'path'
import json2xls from 'json2xls'
import { jsonPaths } from './common.js'

// Process each JSON file
jsonPaths.forEach((jsonPath) => {
  const jsonData = []

  // Add first row with jsonPath
  jsonData.push([jsonPath, '', '', '', ''])
  jsonData.push(['zh', 'en', 'jp', 'kor', '$files'])

  // Read JSON data from file
  const data = fs.readFileSync(path.join(process.cwd(), jsonPath), 'utf-8')

  try {
    // Parse JSON data
    const json = JSON.parse(data)

    // Add JSON data to the array
    Object.entries(json).forEach(([chinesePhrase, translations]) => {
      const row = [chinesePhrase, translations.en, translations.kor, translations.jp, translations.$files.join(',')]
      jsonData.push(row)
    })

    // Convert JSON data to Excel format
    const xls = json2xls(jsonData)

    // Extract the desired portion of the jsonPath for the filename
    const filename = jsonPath.match(/\/apps\/(.*)\/src/)[1] + '.xlsx'

    // Save Excel file with the extracted filename
    const excelPath = path.join(process.cwd(), './scripts/', filename)
    fs.writeFileSync(excelPath, xls, 'binary')

    console.log('JSON file converted to Excel:', excelPath)
  } catch (error) {
    console.error('Error parsing JSON file:', jsonPath, error)
  }
})
