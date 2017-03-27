const achievements = require('overwatch-stats-entities').achievements

module.exports = function (achievementGuid) {
  if (!achievements.catagory.fromGuid[achievementGuid]) {
    return {
      guid: 'overwatch.achievementCategory.-1',
      name: 'Not Found',
      slug: 'notFound'
    }
  }

  return achievements.catagory.fromGuid[achievementGuid]
}
