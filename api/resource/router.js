// `/api/resources` router buraya
const express = require("express");
const router = express.Router();
const model = require("./model");
router.use(express.json());

router.get("/", async (req, res, next) => {
  try {
    const data = await model.fetch();
    res.json(data);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const { resource_name, resource_description } = req.body;
    if (resource_description) {
      const data = {
        resource_name: resource_name,
        resource_description: resource_description,
      };
      const returnData = await model.create(data);
      res.json(returnData);
    } else {
      const data = { resource_name: resource_name };
      const returnData = await model.create(data);
      res.json(returnData);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
