const Sentry = require ("@sentry/node");
const { ProfilingIntegration } = require ("@sentry/profiling-node");
const express = require('express')
const app = express()

const port = 3000

const path = require('path')
const flash = require('express-flash')
const session = require('express-session')
const router = require('./router')
const nodemailer = require('nodemailer')
const swaggerJSON = require('./openapi.json')
const swaggerUI = require("swagger-ui-express")
const passport = require('./utils/passport')
const morgan = require('morgan')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        
    }
}) 
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

app.use(morgan('combined'))

Sentry.init({
    dsn: 'https://a05dbd2f61e5bc742d022ce637d01acb@o4506258326552576.ingest.sentry.io/4506263177134080',
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
      new ProfilingIntegration(),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));
app.use('/', router);


app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

app.use(Sentry.Handlers.errorHandler());

app.use(function onError(err, req, res, next) {
    res.statusCode = 500;
    res.end(res.sentry + "\n");
});

app.listen(port, () => 
    console.log(`Example app listening at http://localhost:${port}`))

module.exports = app