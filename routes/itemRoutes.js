const express = require('express');
const router = express.Router();
const { getItems, createItem, updateItem, deleteItem  } = require('../controllers/itemController');

// GET and POST routes
router.get('/', getItems);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);



/**
 * @swagger
 * /items:
 *   get:
 *     description: Get all items
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', getItems);

/**
 * @swagger
 * /items:
 *   post:
 *     description: Create a new item
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item created
 */
router.post('/', createItem);

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     description: Update an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item updated
 */
router.put('/:id', updateItem);

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     description: Delete an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted
 */
router.delete('/:id', deleteItem);

module.exports = router;
