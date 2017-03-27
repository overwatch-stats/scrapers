const camelCase = require('camelcase')

module.exports = function extractHighlights ($, $doc) {
  const extractedData = {}

  // Loop over each card row and pull the data out
  $doc.each(function () {
    const heading = $(this).find('.card-heading').text().trim()
    const copy = $(this).find('.card-copy').text().trim()
    const slugName = camelCase(copy)

    extractedData[slugName] = heading
  })

  return extractedData
}
