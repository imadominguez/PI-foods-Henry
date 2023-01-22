const { Recipe, Typediet } = require("../db");
const { Op } = require("sequelize");
const { default: axios } = require("axios");
const API_KEY = "5ebe6f81a18e4c41a5ad73dc4f76a524";

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

const getDetailRecipe = async (id) => {
  // si existe database findByPk
  // sino peticion a la Api con ese id
  const getDetail = await Recipe.findByPk(id);
  if (getDetail) return getDetail;
  else throw Error(`No se encontro ninguna receta con ese id ${id}`);
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
    dietsTypes,
  });

  if (dietsTypes.length === 0) throw Error("Faltan tipos de dieta");
  await newRecipe.setTypediets(dietsTypes);
  return newRecipe;
};

module.exports = { getListByQuery, getDetailRecipe, createRecipe };
