const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const flash = require('express-flash')
const session = require('express-session')
const router = require('./router')
const swaggerJSON = require('./openapi.json')
const swaggerUI = require("swagger-ui-express")
const passport = require('./utils/passport')



app.use(express.json()) //req.body untuk json
app.use(express.urlencoded({ extended:false})) //req.body untuk form data
app.use(session({       //config middleware session
    secret : "secret",
    resave : false,
    saveUninitialized : true,

}))
app.use(flash())        //register flash middleware ke express --> req.flash
app.use(passport.initialize());
app.use(passport.session())

app.set("view engine","ejs"); //register ejs sebagai view engine
app.set("views", path.join(__dirname, './app/view')) // mengubah folder views ke app/wiew

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));
app.use('/', router);

app.listen(port, () => 
    console.log(`Example app listening at http://localhost:${port}`))

module.exports = app