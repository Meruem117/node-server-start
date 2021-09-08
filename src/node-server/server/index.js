const url = require('url')
const fs = require('fs')
const path = require('path')
const { basePath, baseUrl } = require('../constant')

function getFileMime(extname) {
    const data = fs.readFileSync(basePath + '/data/mime.json')
    const mimeObj = JSON.parse(data.toString())
    return mimeObj[extname]
}

function initStatic(request, response, staticPath) {
    const pathname = new url.URL(request.url, baseUrl).pathname
    const extname = path.extname(pathname)
    if (extname) {
        try {
            const data = fs.readFileSync(staticPath + pathname);
            if (data) {
                const mime = getFileMime(extname)
                response.writeHead(200, { 'Content-Type': '' + mime + ';charset=utf-8' })
                response.end(data)
            }
        } catch (error) {
            console.error(error)
        }
    }
}

function changeResponse(response) {
    response.send = (data) => {
        response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
        response.end(data)
    }
}

const server = () => {
    const state = {
        get: {},
        post: {},
        staticPath: basePath + '/static/'
    }

    const app = function (request, response) {
        changeResponse(response)
        initStatic(request, response, state.staticPath)
        const pathname = new url.URL(request.url, baseUrl).pathname
        const method = request.method.toLowerCase()
        if (state[method][pathname]) {
            if (method === 'get') {
                state.get[pathname](request, response)
            } else {
                let postData = ''
                request.on('data', (chunk) => {
                    postData += chunk
                })
                request.on('end', () => {
                    request.body = postData
                    state.post[pathname](request, response)
                })
            }
        } else {
            response.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' })
            response.end('404 Not Found')
        }
    }

    app.get = function (name, callback) {
        state.get[name] = callback
    }

    app.post = function (name, callback) {
        state.post[name] = callback
    }

    app.static = function (staticPath) {
        state.staticPath = staticPath
    }

    return app
}

module.exports = server()
