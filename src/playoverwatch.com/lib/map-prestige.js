const prestige = require('overwatch-stats-entities').prestige

module.exports = function (prestigeGuid) {
  if (!prestige.fromGuid[prestigeGuid]) {
    return { prestige: -1, class: 'notFound' }
  }

  return prestige.fromGuid[prestigeGuid]
}
