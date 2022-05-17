const Todo = require("../models/Todo.model");

module.exports.todoControllers = {
  getTodos: async (req, res) => {
    try {
      const todo = await Todo.find();
      res.json(todo);
    } catch (e) {
      res.json(e);
    }
  },
  createTodo: async (req, res) => {
    try {
      const todo = await Todo.create({
        name: req.body.name,
        text: req.body.text,
        completed: req.body.completed,
      });
      res.json(todo);
    } catch (e) {
      res.json(e);
    }
  },
  updateTodoCompleted: async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await Todo.findByIdAndUpdate(id, {
        completed: req.body.completed,
      },
        {new: true});
      res.json(todo);
    } catch (e) {
      res.json(e);
    }
  },
  updateTodoText: async (req,res) => {
    try {
      const {id} = req.params;
      const todo = await Todo.findByIdAndUpdate(id, {
        text: req.body.text,
      },{
        new: true
      })
      res.json(todo)
    }catch (e){
      res.json(e)
    }
  },
  deleteTodo: async (req, res) => {
    try {
      const { id } = req.params;
      await Todo.findByIdAndDelete(id);
      res.json("Дело удалено");
    } catch (e) {
      res.json(e);
    }
  },
};
