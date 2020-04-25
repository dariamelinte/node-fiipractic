const fs = require('fs').promises;
const http = require('http')

const start = async () => {
  try {
    let db = await fs.readFile('./db.json')
    db = JSON.parse(db.toString())

    const server = http.createServer((req, res) => {
      if (req.method === 'GET' && req.url === '/users') {
        const response = {
          success: true,
          users: db.users
        }
        req.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify(response))
        res.end()
      } else if (req.method === 'POST' && req.url === '/users') {
        let body = ''
        req.on('data', data => {
          body += data
        })

        req.on('end', () => {
          body = JSON.parse(body);
          db.users.push(body)

          fs.writeFileSync('./db.json', JSON.stringify(db, null, 2))
          req.statusCode = 201
          res.setHeader('Content-Type', 'application/json')
          res.write(JSON.stringify(response))
          res.end()
        })
      } else {
        res.statusCode = 200;
        res.write('Hello world')
        res.end()
      }
    })

    server.listen(8000, () => {
      console.log('Server lisstening on port 8000')
    })
  } catch (e) {
    console.log(e)
  }
}

start()