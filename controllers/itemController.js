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

// POST create a new item
exports.createItem = async (req, res) => {
   const item = new Item({
      name: req.body.name,
      description: req.body.description
   });

   try {
      const newItem = await item.save();
      res.status(201).json(newItem);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
};

// PUT update an item by ID
exports.updateItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item updated successfully', item: updatedItem });
    } catch (err) {
        res.status(500).json({ message: err.message });
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