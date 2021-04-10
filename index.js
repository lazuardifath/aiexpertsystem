const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set()
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const expert = require('src/utils/diabetes')

app.get('/evaluation', async (req, res) => {
  try {
      const values = {
          dp: JSON.parse(req.query.dp),
          s1: JSON.parse(req.query.s1),
          s2: JSON.parse(req.query.s2),
          s3: JSON.parse(req.query.s3),
          s4: JSON.parse(req.query.s4),
          s5: JSON.parse(req.query.s5),
          s6: JSON.parse(req.query.s6),
          s7: JSON.parse(req.query.s7),
          s8: JSON.parse(req.query.s8),
          s9: JSON.parse(req.query.s9),
          s10: JSON.parse(req.query.s10),
          fpg: req.query.fpg,
          gthae: req.query.gthae
      }


      const { dp, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10,
          fpg, gthae } = values

      // if (!dp || !s1 || !s2 || !s3 || !s4 || !s5 || !s6 || !s7 || !s8 || !s9 || !s10 || !fpg || !gthae) {
      //     return res.send({ error: 'you have to ake sure that the query string is correct' })
      // }

      console.log(values)

      //const result = await expert.finalresult(true, 300, 400, false, false, false, false, false, false, false, false, false, false)
      const result = await expert.finalresult(dp, fpg, gthae, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10)

      return res.json(result)
  } catch (error) {
      return console.log(error)
  }
})

