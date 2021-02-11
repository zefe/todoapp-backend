const express = require('express');
const router = express.Router();

// Controllers
const todosController = require('../controllers/todosController')


module.exports = function() {
    router.get('/todos', todosController.listTodos);
    router.get('/todos/:id', todosController.getTodo)
    router.post('/todos', todosController.newTodo);
    router.put('/todos/:id', todosController.updateTodo);
    router.patch('/todos/:id', todosController.completedTodo);
    router.delete('/todos/:id', todosController.deleteTodo);

    router.get('/', (req, res) => {
        res.json({ appName: 'Todo API', version: 1 })
    })

    return router;
}   