const heros = require('overwatch-stats-entities').heros

module.exports = function (catagoryGuid) {
  if (!heros.fromGuid[catagoryGuid]) {
    if (catagoryGuid === '0x02E00000FFFFFFFF') {
      return {
        guid: '0x02E00000FFFFFFFF',
        name: 'All Heros',
        slug: 'allHeros'
      }
    }

    return {
      guid: '0x0000000000000000',
      name: 'Not Found',
      slug: 'notFound'
    }
  }

  return heros.fromGuid[catagoryGuid]
}
