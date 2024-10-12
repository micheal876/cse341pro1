const express = require('express');
const router = express.Router();
const { getItems, getItemById, createItem, updateItem, deleteItem } = require('../controllers/itemController');

// GET all items
router.get('/', getItems);

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

// GET a single item by ID
router.get('/:id', getItemById);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     description: Get an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item retrieved successfully
 *       404:
 *         description: Item not found
 */
router.get('/:id', getItemById);

// Create a new item
router.post('/', createItem);

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
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               stock:
 *                 type: number
 *               brand:
 *                 type: string
 *               sku:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item created
 */
router.post('/', createItem);

// Update an item by ID
router.put('/:id', updateItem);

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     description: Update an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               stock:
 *                 type: number
 *               brand:
 *                 type: string
 *               sku:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item updated
 *       404:
 *         description: Item not found
 */
router.put('/:id', updateItem);

// Delete an item by ID
router.delete('/:id', deleteItem);

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     description: Delete an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted
 *       404:
 *         description: Item not found
 */
router.delete('/:id', deleteItem);

module.exports = router;
