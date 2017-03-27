module.exports = function (catagoryGuid) {
  switch (catagoryGuid) {
    case 'overwatch.guid.0x0860000000000021':
      return 'timePlayed'
    case 'overwatch.guid.0x0860000000000039':
      return 'gamesWon'
    case 'overwatch.guid.0x086000000000002F':
      return 'weaponAccuracy'
    case 'overwatch.guid.0x08600000000003D2':
      return 'eliminationsPerLife'
    case 'overwatch.guid.0x0860000000000346':
      return 'multikillBest'
    case 'overwatch.guid.0x086000000000039C':
      return 'objectiveKillsAverage'
    case 'overwatch.guid.0x08600000000003D1':
      return 'winPercentage'
    default:
      return 'notFound'
  }
}
