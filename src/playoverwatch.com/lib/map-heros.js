const heros = require('overwatch-stats-entities').heros
const camelCase = require('camelcase')

module.exports = function (heroName) {
  if (!heros.fromName[heroName]) {
    return {
      guid: '0x0000000000000000',
      name: heroName,
      slug: camelCase(heroName)
    }
  }

  return heros.fromName[heroName]
}
