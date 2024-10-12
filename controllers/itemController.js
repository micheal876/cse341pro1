const Item = require('../models/Item');

// GET all items
exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json({ message: 'Items retrieved successfully', items });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving items', error: err.message });
    }
};

// GET a single item by ID
exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item retrieved successfully', item });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving item', error: err.message });
    }
};

// Create a new item
exports.createItem = async (req, res) => {
    const { name, description, price, category, stock, brand, sku } = req.body;

    // Create a new item instance
    const item = new Item({
        name,
        description,
        price,
        category,
        stock,
        brand,
        sku
    });

    try {
        // Save the item to the database
        const newItem = await item.save();
        res.status(201).json({ message: 'Item created successfully', item: newItem });
    } catch (err) {
        res.status(400).json({ message: 'Error creating item', error: err.message });
    }
};

// Update an item by ID
exports.updateItem = async (req, res) => {
    const { name, description, price, category, stock, brand, sku } = req.body;

    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                price,
                category,
                stock,
                brand,
                sku
            },
            { new: true, runValidators: true } // This option returns the updated document
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
    } catch (err) {
        res.status(400).json({ message: 'Error updating item', error: err.message });
    }
};

// DELETE an item by ID
exports.deleteItem = async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting item', error: err.message });
    }
};
