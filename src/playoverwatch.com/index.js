const heighlightsExtractor = require('./extractors/highlights')
const metaExtractor = require('./extractors/meta')
const topHeroesExtractor = require('./extractors/top-heroes')
const careerStatsExtractor = require('./extractors/career-stats')
const achievementsExtractor = require('./extractors/achievements')
const Scraper = require('../lib/scraper')

class Playoverwatch extends Scraper {
  constructor ({ playerInfo = [] }) {
    playerInfo.forEach((player, index) => {
      if (!player.lang || typeof player.lang === 'undefined') {
        throw new Error(`Invalid config missing "[${index}]lang"`)
      }

      if (!player.platform || typeof player.platform === 'undefined') {
        throw new Error(`Invalid config missing "[${index}]platform"`)
      }

      if (!player.region || typeof player.region === 'undefined') {
        throw new Error(`Invalid config missing "[${index}]region"`)
      }

      if (!player.id || typeof player.id === 'undefined') {
        throw new Error(`Invalid config missing "[${index}]id"`)
      }
    })

    super()
    this.playerInfo = playerInfo
  }

  extractData () {
    const data = {}

    return Promise.all(this.playerInfo.map(player => {
      const { id, lang, platform, region } = player
      const url = `https://playoverwatch.com/${lang}/career/${platform}/${region}/${id}`

      data[id] = { competitive: {}, quickplay: {} }

      return super
        // Fetch user page
        .fetchPage(url)
        // Extract meta
        .then($ => {
          const { gamesWon, competitiveRank, playerName, prestige } = metaExtractor($)
          data[id].gamesWon = gamesWon
          data[id].competitiveRank = competitiveRank
          data[id].playerName = playerName
          data[id].prestige = prestige
          return $
        })
        // Extract highlights for user
        .then($ => {
          data[id].quickplay.highlights = heighlightsExtractor($, $('#quickplay .highlights-section .card'))
          data[id].competitive.highlights = heighlightsExtractor($, $('#competitive .highlights-section .card'))
          return $
        })
        // Extract top player stats
        .then($ => {
          data[id].quickplay.topHeroes = topHeroesExtractor($, $('#quickplay .progress-category'))
          data[id].competitive.topHeroes = topHeroesExtractor($, $('#competitive .progress-category'))
          return $
        })
        // Extract career stats
        .then($ => {
          data[id].quickplay.careerStats = careerStatsExtractor($, $('#quickplay .career-stats-section .js-stats'))
          data[id].competitive.careerStats = careerStatsExtractor($, $('#competitive .career-stats-section .js-stats'))
          return $
        })
        // Extract achievements
        .then($ => {
          data[id].achievements = achievementsExtractor($)
          return $
        })
    })).then(() => data)
  }
}

module.exports = Playoverwatch
