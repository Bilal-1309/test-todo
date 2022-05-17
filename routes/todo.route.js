const {Router} = require('express');
const {todoControllers} = require('../controllers/todo.controller');
const router = Router();

router.get('/todos', todoControllers.getTodos);
router.post('/create/todo', todoControllers.createTodo);
router.patch('/admin/todo/:id', todoControllers.updateTodoCompleted);
router.patch('/todo/:id', todoControllers.updateTodoText);
router.delete('/admin/todo/delete/:id', todoControllers.deleteTodo);

module.exports = router;