const { Router } = require("express");
const { getDiets } = require("../controllers/dietsControllers");
const dietsRouter = Router();

dietsRouter.get("/", async (req, res) => {
  try {
    const dietsList = await getDiets();
    res.status(200).json(dietsList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = dietsRouter;
