// `/api/tasks` router buraya
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
    const data = await model.create(req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
