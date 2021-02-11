const { response } = require('express');
const Todos = require('../models/Todos');

exports.listTodos =  async (req, res) => {

    try {
        const response = await Todos.findAll()
        .then(function(data) {
            const res = { success: true, message: "Load success", data: data}
            return res;
        })

        return res.json(response)
        
    } catch (error) {

        const res = {
            success: false,
            error: error
        }

        return res;
    }
}

exports.getTodo = async (req, res) => {
    try {
        
        const { id } = req.params;
        
        const response = await Todos.findAll({
            attributes: ['id', 'name', 'description', 'completed', 'createdAt' ],
            where: { id: id }
        })
        .then(function(data){
            const res = { success: true, data: data }
            return res;
        })
        .catch(error => {
            const res = { success: false, error: error }
            return res;
        })

        res.json(response)

    } catch (error) {
        console.log(error);
    }
}



exports.newTodo =  async (req, res) => {

    const {name, description, completed} = req.body;

    try {
        
        const response = await Todos.create({
            name: name,
            description: description,
            completed: completed
        })
        .then(function(data) {
            const res = {
                success: true,
                message: "Created successful",
                data: data
            }
            return res;
        })
        .catch(error => {
            console.log("Errorr", error)
            const res = {success: false, error: error}
            return res;
        });
        
        return res.json(response)
        
    } catch (error) {
        console.log( error)
    }
}


exports.updateTodo =  async (req, res) => {

    const {id} = req.params;
    const {name, description, completed} = req.body;

    try {
    
        const response = await Todos.update({
            name: name,
            description: description,
            completed: completed
            },{
                where: {
                    id: id
                }
            })
        .then(function(data) {
            const res = {
                success: true,
                message: "Updated successful",
                data: data
            }
            return res;
        })
        .catch(error => {
            console.log("Error", error)
            const res = {success: false, error: error}
            return res;
        });
        
        return res.json(response)
        
    } catch (error) {
        console.log( error)
    }
}

exports.completedTodo =  async (req, res) => {
    
    const { id } = req.params;

    try {
        
        const todo = await Todos.findOne({where: { id }});
        // change state
        let completed = false;
        if(todo.completed === completed){
            completed = true;
        }
        todo.completed = completed;

        const result = await todo.save();

        if(!result) return next();
        
        return res.json({ message: 'Todo updated successfully'} )
        
    } catch (error) {
        console.log( error)
    }
}

exports.deleteTodo = async(req, res) => {

    try {
        const { id } = req.params;

        const response = await Todos.destroy({
            where: { id: id }
        })
        .then((data) => {
            const res = { success: true, data: data, message: "Deleted successful"}
            return res;
        })
        .catch(error => {
            const res = { success: false, error: error }
            return res;
        });

        return res.json(response)
        
    } catch (error) {
        console.log( error)
    }
}
