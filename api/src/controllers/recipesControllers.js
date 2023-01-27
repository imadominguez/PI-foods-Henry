const { Recipe, Typediet } = require("../db");
const { Op } = require("sequelize");
const { default: axios } = require("axios");
const API_KEY = "9d879e216f014d05882e91263780e4fd";

const getListByQuery = async (title) => {
  if (title) {
    const getList = await Recipe.findAll({
      where: { title: { [Op.iLike]: `%${title}%` } },
      include: [
        {
          model: Typediet,
          through: { attributes: [] },
        },
      ],
    });
    const getListApi = axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=25&addRecipeInformation=true`
    );
    let listApi = (await getListApi).data.results;
    if (listApi.length !== 0) {
      listApi = listApi.filter((food) => {
        return food.title.toLowerCase().includes(title);
      });
    }
    const allResults = [...getList, ...listApi];
    console.log(allResults);
    if (allResults.length !== 0) return allResults;
    else throw Error(`No se encontro ninguna receta con el nombre de ${title}`);
  } else {
    const getListDb = await Recipe.findAll({
      include: [
        {
          model: Typediet,
          through: { attributes: [] },
        },
      ],
    });
    const getListApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=25&addRecipeInformation=true`
    );
    let listRecipesApi = getListApi.data.results;
    const allResults = [...getListDb, ...listRecipesApi];
    if (allResults.length === 0) throw Error("No se encontraron resultados");
    else return allResults;
  }
};

const getDetailRecipe = async (idFront, database) => {
  // si existe database findByPk
  if (database == "true") {
    let detailRecipe = Recipe.findByPk(idFront, {
      include: [
        {
          model: Typediet,
          through: { attributes: [] },
        },
      ],
    });
    if (!detailRecipe || detailRecipe == null)
      throw Error(`No se encontro una receta con ese id ${idFront}`);
    return detailRecipe;
  } else {
    let detailRecipe = await axios.get(
      `https://api.spoonacular.com/recipes/${idFront}/information?apiKey=${API_KEY}`
    );
    if (!detailRecipe)
      throw Error(`No se encontro una receta con ese id ${id}`);
    const {
      id,
      title,
      image,
      summary,
      healthScore,
      instructions,
      dishTypes,
      diets,
    } = detailRecipe.data;

    let recipe = {
      id,
      title,
      image,
      summary,
      healthScore,
      instructions,
      dishTypes,
      diets,
    };
    // aca desmenuzo el resultado de la api con lo que me piden en detail
    return recipe;
  }
};

const createRecipe = async (
  title,
  summary,
  healthScore,
  stepByStep,
  dietsTypes
) => {
  if (!title || !summary) throw Error("Datos obligatorios no recibidos");

  const newRecipe = await Recipe.create({
    title,
    summary,
    healthScore,
    stepByStep,
  });

  if (dietsTypes.length === 0) throw Error("Faltan tipos de dieta");
  await newRecipe.setTypediets(dietsTypes);
  return newRecipe;
};

const deleteRecipe = async (id) => {
  Recipe.destroy({ where: { id: id } });
};

const updateRecipe = async (receta, id) => {
  console.log(receta.dietsTypes);
  const actualize = await Recipe.update(receta, { where: { id: id } });
  const actualizeRecipeDiets = await Recipe.findByPk(id);
  await actualizeRecipeDiets.setTypediets(receta.dietsTypes);
  return actualize;
};

module.exports = {
  getListByQuery,
  getDetailRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
};
