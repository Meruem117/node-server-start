const fs = require('fs')
const path = require('path')
const url = require('url')
const ejs = require('ejs')
const qs = require('querystring')
const { basePath, baseUrl } = require('../constant')

const getFileMime = function (extname) {
    const data = fs.readFileSync(basePath + '/data/mime.json')
    const mimeObj = JSON.parse(data.toString())
    return mimeObj[extname]
}

const app = {
    static: (request, response, staticPath) => {
        const filename = request.url === '/' ? 'index.html' : request.url
        const extname = path.extname(filename)
        if (extname) {
            if (filename !== '/favicon.ico') {
                try {
                    const data = fs.readFileSync(staticPath + filename)
                    if (data) {
                        const mime = getFileMime(extname)
                        response.writeHead(200, { 'Content-Type': `${mime};charset=utf-8` })
                        response.end(data)
                    } else {
                        response.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' })
                        response.end('404 Not Found')
                    }
                } catch (error) {
                    console.error(error)
                }
            }
        }
    },
    login: (request, response) => {
        const message = "welcome to login page"
        const list = [
            { title: 'title1' },
            { title: 'title2' },
            { title: 'title3' }
        ]
        ejs.renderFile(basePath + '/views/login.ejs', {
            message: message,
            list: list
        }, (error, data) => {
            response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
            response.end(data)
        })
    },
    news: (request, response) => {
        const query = new url.URL(request.url, baseUrl).searchParams
        console.log(query)
        console.log(query.get('id'))
        response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
        response.end('get')
    },
    form: (request, response) => {
        ejs.renderFile(basePath + '/views/form.ejs', {}, (error, data) => {
            response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            response.end(data)
        })
    },
    regist: (request, response) => {
        let postData = ''
        request.on('data', (chunk) => {
            postData += chunk
        })
        request.on('end', () => {
            const res = qs.parse(postData)
            console.log(res)
            console.log(res.username)
            response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
            response.write('post')
            response.end(postData)
        })
    },
    error: (request, response) => {
        response.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' })
        response.end('404 Not Found')
    }
}

module.exports = app
