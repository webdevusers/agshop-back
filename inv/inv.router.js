const Router = require("express");
const router = new Router();
const Inventory = require("./inv.model");
const Item = require("./item.model");

// Inventory
router.post("/inv/create", async (req, res) => {
  try {
    const { title } = req.body;

    const item = await new Inventory({
      title,
      items: [],
    }).save();

    res.status(500).json({ status: "Succesfully", message: `${item}` });
  } catch (e) {
    res.status(500).json({ status: "Error", message: `${e}` });
    console.log(e);
  }
});

router.get("/inv/allNames", async (req, res) => {
  try {
    const items = await Inventory.find();

    res.status(200).json(items);
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: "Error", message: e.message });
    console.log(e);
  }
});
router.get("/inv/get/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Inventory.findById(id).populate('items');

    res.status(200).json({ status: "Succesfully", message: item });
  } catch (e) {
    res.status(500).json({ status: "Error", message: e.message });
    console.log(e);
  }
});
router.get("/inv/getAll", async (req, res) => {
  try {
    const items = await Inventory.find().populate('items')

    res.status(200).json(items)
  } catch(e) {
    console.log(e)
    res.status(500).send(e)
  }
})
// Items
router.post("/item/create", async (req, res) => {
  try {
    const {
      title,
      price,
      images,
      oldPrice,
      variations,
      desc,
      chars,
      reviews,
      inventoryId,
    } = req.body;
    const newItem = new Item({
      images,
      title,
      price,
      oldPrice,
      variations,
      desc,
      chars,
      reviews,
    });
    const savedItem = await newItem.save();

    if (inventoryId) {
      await Inventory.findByIdAndUpdate(inventoryId, {
        $push: { items: savedItem._id },
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Item created successfully",
      item: savedItem,
    });
  } catch (e) {
    res.status(500).json({ status: "Error", message: e.message });
    console.log(e);
  }
});
router.get('/item/get/:id', async (req, res) => {
  try {
    const {id} = req.params;

    const item = await Item.findById(id);

    res.status(200).json(item)

  } catch(e) {
    res.status(500).json({status: 'Erorr', message: e})
  }
})
module.exports = router;
