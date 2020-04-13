// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path')
const fs = require('fs')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()
const jsonWebToken = require('jsonwebtoken')
const preconditions = require('preconditions')
const cors = require('cors')
const pagination = require('./pagination')

server.use(cors())
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.url.includes('/cnpj')) {
    if (req.url.includes('33333333333333')) {
      res.status(404).json({
        response: {
          data: {
            'err': {
              "message": "CNPJ não foi encontrado na base de dados da receita federal.",
              "code": 404,
              "type": "NotFound"
            }
          },
          status: 404
        }
      })
    } else if (req.url.includes('44444444444444')) {
      res.status(400).json({
        response: {
          data: {
            'err': {
              "message": "CNPJ informado é inválido",
              "code": 400,
              "type": "BadRequest"
            }
          },
          status: 400
        }
      })
    } else if (req.url.includes('55555555555555')) {
      res.status(500).json({
        response: {
          data: {
            'err': {
              "message": "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
              "code": 500,
              "type": "InternalServerError"
            }
          },
          status: 500
        }
      })
    } else {
      setTimeout(next, 100)
    }
  } else if (req.url.includes('/admin/')) {
    req.url.includes('exame') && setTimeout(next, 300)
    req.url.includes('risco') && setTimeout(next, 300)
  } else {
    // next()
    setTimeout(next, 100)
  }
})
server.use(middlewares)

server.post('/authentication/loginUserPassword', (req, res) => {
  preconditions.errr().shouldBeDefined(req.body.Username, 'req.body.Username Not Defined').test()
  preconditions.errr().shouldBeDefined(req.body.Password, 'req.body.Password Not Defined').test()
  const authenticationResponse = JSON.parse(fs.readFileSync(path.join(__dirname, 'authenticationResponse.json')))
  let jwt = jsonWebToken.decode(authenticationResponse.authentication)
  authenticationResponse.authentication = jsonWebToken.sign({ userData: jwt.userData }, 'secret', { expiresIn: '2h' })
  jwt = jsonWebToken.decode(authenticationResponse.authentication)
  console.log(new Date(jwt.exp * 1000))
  res.status(200).json(authenticationResponse)
})

server.post('/funcionarios', pagination.funcionarios)

const updatesAndInserts = [
  { method: 'put', url: '/empresa/*' },
  { method: 'put', url: '/funcao/*' },
  { method: 'put', url: '/setor/*' },
  { method: 'put', url: '/corporacao/*' },
  { method: 'post', url: '/funcao' },
  { method: 'post', url: '/corporacao' },
  { method: 'post', url: '/empresa' },
  { method: 'post', url: '/setor' }
]

updatesAndInserts.forEach(c => {
  server[c.method](c.url, (req, res) => res.status(200).json({}))
})

server.use(jsonServer.rewriter(JSON.parse(fs.readFileSync(path.join(__dirname, 'routes.json')))))
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
