var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic("..")).listen(8087, function () {
    console.log('Server running on 8087...');
});
