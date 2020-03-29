const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');

const { host, port, user, pass } = require('../../config/mail.json');

var transport = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass
  }
})

transport.use('compiler', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mail'),
    extName: '.html'
}))

module.exports = transport