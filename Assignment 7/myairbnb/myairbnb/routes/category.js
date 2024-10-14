const express = require('express')
const db = require('../db')
const utils = require('../utils')

//import multer
const multer = require('multer')
const { route } = require('./user')

//create object to upload files
//  the upload here is middleware
const upload = multer({dest:'images'})

const router = express.Router()

//use middlewarw (upload ) to single icon
router.post('/', upload.single('icon'),(request,response) => {
    console.log(request.body)
    const {title, details} = request.body

    //get the name of upload file
    console.log(request.file)
    const fileName = request.file.filename
    //console.log(title,details,fileName)
    const statement =`insert into category(title, details, image) values(?, ?, ?)`
    db.pool.execute(
        statement,
        [title,details, fileName],
        (error, categories) => {
            console.log(error)
            response.send(utils.createResult(error, categories))
        }
    )
})

router.get('/',(request,response) => {
        const statement = `select id, title, details, image from category;`
        console.log(statement)
        db.pool.query(statement,(error, categories)=>{
            response.send(utils.createResult(error, categories))
       })
})

module.exports = router