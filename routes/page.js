// page.js
import Cosmic from 'cosmicjs'
module.exports = (app, config, partials) => {
  app.get('/:slug', (req, res) => {
    const slug = req.params.slug
    Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET } }, (err, response) => {
      res.locals.cosmic = response
      const pages = response.objects.type.pages
      pages.forEach(page => {
        if (page.slug === slug)
          res.locals.page = page
      })
      if (!res.locals.page) {
        return res.status(404).render('404.html', {
          partials
        })  
      }
      response.object.nav.metafields.forEach(nav_item => {
        if (nav_item.value.replace('/','') === slug)
          nav_item.active = true
      })
      return res.render('page.html', {
        partials
      })
    })
  })
}
