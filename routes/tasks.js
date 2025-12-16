const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

// Routes delegate to controller functions for clarity
router.get('/', tasksController.getAll);
router.post('/', tasksController.create);
router.put('/:id', tasksController.update);
router.delete('/:id', tasksController.remove);

module.exports = router;

