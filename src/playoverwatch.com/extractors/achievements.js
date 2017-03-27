const mapAchievements = require('../lib/map-achievements')

module.exports = function extractAchievements ($) {
  const extractedData = {}

  $('#achievements-section .u-relative').each(function () {
    const catagory = mapAchievements($(this).attr('data-category-id')).slug
    extractedData[catagory] = []

    $(this).find('.achievement-card').each(function () {
      if (!$(this).hasClass('m-disabled')) {
        extractedData[catagory].push($(this).find('.media-card-title').text().trim())
      }
    })
  })

  return extractedData
}
