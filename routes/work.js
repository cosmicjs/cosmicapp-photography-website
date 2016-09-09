// home.js
import Cosmic from 'cosmicjs'
module.exports = (app, config, partials) => {
  app.get('/work', (req, res) => {
    Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET } }, (err, response) => {
      res.locals.cosmic = response
      res.locals.page = response.object.work
      res.locals.works = response.objects.type.works
      response.object.nav.metafields.forEach(nav_item => {
        if (nav_item.value.replace('/','') === 'work')
          nav_item.active = true
      })
      return res.render('work.html', {
        partials
      })
    })
  })
}
