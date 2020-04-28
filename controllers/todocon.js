let { Todo } = require('../models')

class TodoCon {
    static show (req,res) {
        let { id } = req.currentUser
        Todo.findAll( {
            where : {
                UserId : id
            }
        })
        .then(data=>{
            console.log(id)
            res.status(200).json({
                data
            })
        })
        .catch(err=>{
            res.status(500).json({
                error : err.errors[0].message
            })
        })
    }

    static addTodo (req,res) {
        let { id } = req.currentUser
        let { title , description , due_date , UserId } = req.body
        Todo.create({
            title,
            description,
            due_date,
            UserId : id
        })
        .then(data=>{
            res.status(201).json({
                msg : 'success adding task',
                data
            })
        })
        .catch(err=>{
            res.status(500).json({
                error : err
            })
        })
    }

    static edit (req,res) {
        let { title , description , due_date } = req.body
        Todo.update({
            title,
            description,
            due_date
        }, {
            where : {
                id : req.params.id
            }
        })
        .then(data=>{
            res.status(201).json({
                msg : ` success editing task with id ${req.params.id}`,
            })
        })
        .catch(err=>{
            res.status(500).json({
                error : err.errors[0].message
            })
        })
    }

    static delete (req,res) {
        Todo.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(_=>{
            res.status(201).json({
                msg : `success deleting task with id ${req.params.id}`
            })
        })
        .catch(err=>{
            res.status(500).json({
                error : err.errors[0].message
            })
        })
    }
}


module.exports = TodoCon;