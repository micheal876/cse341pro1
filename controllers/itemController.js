const Item = require('../models/Item');

// GET all items
exports.getItems = async (req, res) => {
   try {
      const items = await Item.find();
      res.json(items);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

// controllers/itemController.js

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
        res.status(400).json({ message: err.message });
    }
};


// PUT update an item by ID
// controllers/itemController.js

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
        res.status(400).json({ message: err.message });
    }
};


// DELETE an item by ID
exports.deleteItem = async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};