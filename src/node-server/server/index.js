const url = require('url')
const { basePath, baseUrl } = require('../constant')

const server = () => {
    const state = {
        get: {},
        post: {},
        staticPath: basePath + '/static/'
    }

    const app = function (request, response) {
        const pathname = new url.URL(request.url, baseUrl).pathname
        const method = request.method.toLowercase()
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

module.exports = server
