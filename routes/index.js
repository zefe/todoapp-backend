const express = require('express');
const router = express.Router();

// Controllers
const todosController = require('../controllers/todosController')


module.exports = function() {
    router.get('/', todosController.listTodos);
    router.get('/:id', todosController.getTodo)
    router.post('/', todosController.newTodo);
    router.put('/:id', todosController.updateTodo);
    router.patch('/:id', todosController.completedTodo);
    router.delete('/:id', todosController.deleteTodo);

    router.get('/', (req, res) => {
        res.json({ appName: 'Todo API', version: 1 })
    })

    return router;
}   