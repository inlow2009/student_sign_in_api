let express = require('express')
let Sequelize = require('sequelize')
let db = require('../models')
let Student = db.Student

let router = express.Router()

router.get('/students', function(req, res, next){
    Student.findAll( {order: ['name']} ).then( students => {
        return res.json(students)
    }).catch( err => next(err))
})

router.post('/students', function(req, res, next){
    Student.create(req.body).then( (data) => {
        return res.status(201).send('ok')
    }).catch( err => {
        if (err instanceof Sequelize.ValidationError) {
            let messages = err.errors.map( e => e.message )
            // 400 = bad request from user
            return res.status(400).json(messages)
        }
        return next(err)
    })
})

router.patch('/students/:id', function(req, res, next) {
    Student.update( req.body, { where: { id: req.params.id} })
    .then( rowsModified => {
       if (!rowsModified[0]) {
           //4040 = not gound, student with this id not found
           return res.status(404).send('Not Found')
       } else {
           return res.send(ok)
       }
    }).catch( err => {
        if (err instanceof Sequelize.ValidationError) {
            let messages = err.errors.map( (e) => e.message)
            //4000 code = bad request from user
            return res.status(400).json(messages)
        }
        return next(err)
    })
})

router.delete('/students/:id', function(req, res, next){
    Student.destroy({where: {id: req.params.id}}).then( rowsModified => {
        return res.send('ok')
    }).catch( err => next(err))
})

module.exports = router