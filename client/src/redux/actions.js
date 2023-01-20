const { default: axios } = require("axios");

export const FILTER_DIETS = "FILTER_DIETS";
export const ADD_RECIPES = "ADD_RECIPES";
export const ORDER_RECIPES = "ORDER_RECIPES";
export const ORDER_HEALSCORE = "ORDER_HEALSCORE";
export const GET_DIETS = "GET_DIETS";

// -------- Agregar recetas -----------//
export const addRecipes = (recipes) => {
  return {
    type: ADD_RECIPES,
    payload: recipes,
  };
};

// -------- Agregar dietas -----------//

export const addDiets = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/diets");
    dispatch({ type: GET_DIETS, payload: response.data });
  };
};

// -------- Filtrar recetas -----------//
export const filterDiets = (diet) => {
  return {
    type: FILTER_DIETS,
    payload: diet,
  };
};

// -------- Ordenar recetas por nombre -----------//
export const orderRecipes = (value) => {
  console.log("estoy en actions orderRecipes");
  return {
    type: ORDER_RECIPES,
    payload: value,
  };
};

// -------- Ordenar recetas por healthScore -----------//
export const orderHealScore = (value) => {
  return {
    type: ORDER_HEALSCORE,
    payload: value,
  };
};
