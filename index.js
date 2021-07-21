const http = require('http')
const { Readable } = require('stream')
const fs = require('fs')
const path = require('path')
const INDEX_LOCATION = path.join(__dirname, 'index.html')

const server = http.createServer((req, res) => {
  const accept = req.headers.accept

  if (!accept) {
    console.error('Got request without accept header')
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    })
    res.end('Invalid content type, please set an accept header for Server Sent Events or for HTML')
  } else if (accept.includes('text/html')) {
    console.log('Sending index html')
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=UTF-8'
    })
    fs.createReadStream(INDEX_LOCATION).pipe(res)
  } else if (accept.includes('text/event-stream')) {
    console.log('Sending events')
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=UTF-8'
    })
    Readable.from(makeEvents(req.url)).pipe(res)
  } else {
    console.error('Got invalid accept header', accept)
    res.writeHead(400, {
      'Content-Type': 'text/plain; charset=UTF-8'
    })
    res.end('Invalid content type, please set an accept header for Server Sent Events or for HTML')
  }
})

server.listen(42069, () => {
  console.log('Listening on:')
  console.log('http://127.0.0.1:42069/')
})

async function * makeEvents (url) {
  while (true) {
  	// Stringify some data with newlines and `data:` between the keys
  	yield 'data:'
    yield JSON.stringify({
      time: Date.now(),
      url: url
    }, null, '\t').replace(/\n/g, '\ndata:')
    yield `\n\n`
    await sleep(5000)
  }
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
