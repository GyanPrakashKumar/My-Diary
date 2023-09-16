const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method);

    // set Header content type
    res.setHeader('Content-Type', 'text/html');

    // Routing
    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;

        // redirect to about page from about-me page
        case '/about-me':
            res.setHeader('Location', '/about');
            res.statusCode = 301;
            res.end();
            break;
        case '/contact':
            path += 'contact.html';
            res.statusCode = 200;
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // send an html file
    fs.readFile(path, (error, data) => {
        if (error) {
            console.log(error); // log the error
            res.end();          // end the response
        } else {
            res.write(data);    // write the data from the file
            res.end();          // end the response

            // res.end(data);     // same as above
        }
    })
});

const PORT = 3000 || 5000;

server.listen(PORT, 'localhost', () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});