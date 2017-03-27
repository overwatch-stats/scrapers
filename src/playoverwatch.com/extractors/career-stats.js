const camelCase = require('camelcase')
const mapCareerCategory = require('../lib/map-career-category')

module.exports = function extractCareerStats ($, $doc) {
  const extractedData = {}

  // Loop over each card row and pull the data out
  $doc.each(function () {
    const catagoryId = $(this).attr('data-category-id')
    const catagory = mapCareerCategory(catagoryId)
    extractedData[catagory.slug] = {}

    $(this).find('.data-table').each(function () {
      const tableTitle = camelCase($(this).find('.stat-title').text()).trim()
      extractedData[catagory.slug][tableTitle] = {}

      $(this).find('tbody tr').each(function () {
        const key = camelCase($($(this).find('td')[0]).text())
        const value = $($(this).find('td')[1]).text().trim()
        extractedData[catagory.slug][tableTitle][key] = value
      })
    })
  })

  return extractedData
}
