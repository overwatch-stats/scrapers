const fetch = require('node-fetch')
const cheerio = require('cheerio')

class Scraper {
  fetchPage (url) {
    return fetch(url)
      .then(res => res.text())
      .then(body => cheerio.load(body))
  }
}

module.exports = Scraper
