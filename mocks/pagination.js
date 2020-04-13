const fs = require('fs')
const path = require('path')

const funcionarios = async (req, res) => {
  const { page, perPage } = req.query
  const { filters, sort } = req.body

  const dbJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')))

  let items = dbJson.funcionarios

  if (filters.length) {
    let itemsFiltered = []
    filters.forEach(filter => {
      itemsFiltered = [
        ...itemsFiltered,
        ...items.filter(item => item.status === 1)
      ]
    })

    items = itemsFiltered
  }

  if (parseInt(sort.desc)) {
    const prop = sort.column ? sort.column : 'nome'
    items = items.sort((a, b) => (a[prop] < b[prop]) ? 1 : -1)
  }

  items = items.slice((page - 1) * perPage, page * perPage)

  return res.status(200).json({
    total: items.length,
    last_page: 2,
    page: parseInt(page),
    data: items
  })
}

module.exports = {
  funcionarios
}