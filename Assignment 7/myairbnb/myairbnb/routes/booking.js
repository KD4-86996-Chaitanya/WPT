const express = require('express')
const db = require('../db')
const utils = require('../utils')
const config = require('../config')

const router = express.Router()

router.get('/',(request, response) => {
    const statement = `select * from bookings`
    db.pool.query(statement,(error, booking) => {
        response.send(utils.createResult(error, booking))
    })
})

router.post('/',(request, response) => {
    const { propertyId, total, fromDate, toDate } = request.body
    console.log(request.body)
    const statement = `insert into bookings (userid, propertyId, total, fromDate, toDate) Values(?,?,?,?,?)`
    db.pool.execute(
        statement,
        [request.userid, propertyId, total, fromDate, toDate],
        ( error, bookings) => {
            response.send(utils.createResult(error, bookings))
            console.log(error)
        }
    )
})

module.exports = router;