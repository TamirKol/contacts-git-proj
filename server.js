import express from 'express'

import { contactService } from './services/contact.service.js'
import { loggerService } from './services/logger.service.js'

const app = express()

// App Configuration
app.use(express.static('public'))
app.use(express.json()) // for req.body

// List
// app.get('/api/contact', (req, res) => {
//     const { firstName, lastName, pageIdx, email,phone ,sortType, sortDesc } = req.query
//     const filterBy = { firstName, lastName, email,phone, pageIdx, }

//     const sortBy = { type: sortType, desc: sortDesc }
//     contactService.query()
//       .then(data => {
//         res.send(data)
//       }).catch(err => {
//         console.log(err)
//         // loggerService.error('Cannot get todos', err)
//         res.status(400).send('Cannot get contacts')
//     })
//   })

app.get('/api/contact', (req, res) => {
  const { title, minSeverity, pageIdx, labels, sortType, sortDesc } = req.query
  const filterBy = {}

  // const sortBy = { type: sortType, desc: sortDesc }
  contactService.query(filterBy)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      loggerService.error('Cannot get contacts', err)
      res.status(400).send('Cannot get contacts')
  })
})

const PORT = 3030
app.listen(PORT, () => console.log(`Server ready at port ${PORT}! http://localhost:${PORT}`))
