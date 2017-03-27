const mapPrestige = require('../lib/map-prestige')
const prestigeEntities = require('overwatch-stats-entities').prestige

module.exports = function extractMeta ($) {
  const prestigeRegx = /0x([^_]*)/

  const {
    gamesWon,
    competitiveRank,
    playerName,
    level
  } = {
    competitiveRank: $('.masthead-player .competitive-rank div').text().trim(),
    gamesWon: $('.masthead-detail').text().trim(),
    playerName: $('.header-masthead').text().trim(),
    level: $('.masthead-player-progression .u-vertical-center').text().trim()
  }

  const prestigeEl = $('.masthead-player-progression .player-rank')
  let prestige = {}

  if (prestigeEl.length > 0) {
    prestige = mapPrestige(prestigeRegx.exec(prestigeEl.css()['background-image'])[0])
  } else {
    prestige = prestigeEntities.prestigeZero
  }

  return {
    gamesWon,
    competitiveRank,
    playerName,
    level,
    prestige
  }
}
