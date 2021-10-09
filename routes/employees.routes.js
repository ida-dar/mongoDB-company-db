//employees.routes.js

const express = require('express');
const router = express.Router();

const EmployeeController = require('../controllers/employees.controller');

router.get('/employees', EmployeeController.getAll);
router.get('/employees/random', EmployeeController.getRandom);
router.get('/employees/:id', EmployeeController.getById);
router.post('/employees', EmployeeController.postOne);
router.put('/employees/:id', EmployeeController.putOneById);
router.delete('/employees/:id', EmployeeController.deleteById);

module.exports = router;
