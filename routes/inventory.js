var express = require('express');
var router = express.Router();

let inventoryController = require('../controllers/inventory');
let authController = require('../controllers/auth');

/* GET list of items */
router.get('/list', inventoryController.inventoryList);

// Routers for edit
router.put('/edit/:id', authController.requireAuth, authController.isAllowed, inventoryController.processEdit);
// router.put('/edit/:id', inventoryController.processEdit);

// Delete
router.delete('/delete/:id', authController.requireAuth, authController.isAllowed, inventoryController.performDelete);
// router.delete('/delete/:id',inventoryController.performDelete);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', authController.requireAuth, inventoryController.processAdd);
// router.post('/add', inventoryController.processAdd);

module.exports = router;