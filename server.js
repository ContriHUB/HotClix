const   express = require('express'),
        mysql = require('mysql'),
        path = require('path'),
        dotenv = require('dotenv'),
        util = require('util'),
        cors = require('cors'),
        fileUpload = require('express-fileupload'),
        app = express()


// IMPORT ROUTES 
const authRoutes = require('./routes/auth')
const imageRoutes = require('./routes/image')
const galleryRoutes = require('./routes/gallery')

dotenv.config()

// CONNECT TO DB
const db = mysql.createConnection({
    host        : process.env.DB_HOST,
    user        : process.env.DB_USER,
    password    : process.env.DB_PASSWD,
    database    : process.env.DB_NAME
});

db.connect((err) => {
    if(err) throw err;
    console.log('db connected...')
})

global.db = db;
global.dbquery = util.promisify(db.query).bind(db)

// MIDDLEWARES 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());

// CORS
app.use(cors()) 


// ROUTE MIDDLEWARES 
app.use('/api/users', authRoutes)
app.use('/api/images', imageRoutes)
app.use('/api/gallery', galleryRoutes)


// HOSTING CONFIG


// PORT 
const port = process.env.PORT || 5000;


// LISTENING
app.listen(port, console.log('server running...'))