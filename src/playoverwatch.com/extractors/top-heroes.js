const mapTopHerosCategories = require('../lib/map-top-heros-categories')
const mapHeros = require('../lib/map-heros')

module.exports = function extractTopHeroes ($, $doc) {
  const extractedData = {}

  // Loop over each card row and pull the data out
  $doc.each(function () {
    const catagory = mapTopHerosCategories($(this).attr('data-category-id'))

    extractedData[catagory] = {}

    $(this).find('.progress-category-item').each(function () {
      const key = mapHeros($(this).find('.title').text().trim()).slug
      const value = $(this).find('.description').text().trim()

      extractedData[catagory][key] = value
    })
  })

  return extractedData
}
