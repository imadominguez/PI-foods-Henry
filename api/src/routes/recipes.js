const { Router } = require("express");
const {
  getListByQuery,
  getDetailRecipe,
  createRecipe,
} = require("../controllers/recipesControllers");
const recipesRouter = Router();

recipesRouter.get("/", async (req, res) => {
  const { title } = req.query;
  try {
    const response = await getListByQuery(title);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

recipesRouter.get("/:id/:dataBase", async (req, res) => {
  const { id, dataBase } = req.params;

  try {
    const detailRecipe = await getDetailRecipe(id, dataBase);
    res.status(200).json(detailRecipe);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

recipesRouter.post("/", async (req, res) => {
  const { title, summary, healthScore, stepByStep, dietsTypes } = req.body;
  try {
    const newRecipe = await createRecipe(
      title,
      summary,
      healthScore,
      stepByStep,
      dietsTypes
    );
    res.status(200).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = recipesRouter;
