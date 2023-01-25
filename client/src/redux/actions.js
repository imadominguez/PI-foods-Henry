const { default: axios } = require("axios");

export const FILTER_DIETS = "FILTER_DIETS";
export const ADD_RECIPES = "ADD_RECIPES";
export const ORDER_RECIPES = "ORDER_RECIPES";
export const ORDER_HEALSCORE = "ORDER_HEALSCORE";
export const GET_DIETS = "GET_DIETS";
export const RESET_FILTER = "RESET_FILTER";
export const GET_DETAILRECIPE = "GET_DETAILRECIPE";
export const SAVE_FILTER_VALUE = "SAVE_FILTER_VALUE";
// -------- Add recipes -----------//
export const addRecipes = (title) => {
  return async function (dispatch) {
    const response = await axios.get(
      `http://localhost:3001/recipes?title=${title}`
    );
    dispatch({ type: ADD_RECIPES, payload: response.data });
  };
  // return {
  //   type: ADD_RECIPES,
  //   payload: recipes,
  // };
};

// -------- Add diets -----------//
export const addDiets = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/diets");
    dispatch({ type: GET_DIETS, payload: response.data });
  };
};

// -------- Filter recipes -----------//
export const filterDiets = (diet) => {
  return {
    type: FILTER_DIETS,
    payload: diet,
  };
};

// -------- Order recipes by name -----------//
export const orderRecipes = (name) => {
  console.log("estoy en actions orderRecipes");
  return {
    type: ORDER_RECIPES,
    payload: name,
  };
};

// -------- Order recipes by healthScore -----------//
export const orderHealScore = (value) => {
  return {
    type: ORDER_HEALSCORE,
    payload: value,
  };
};

// ----------- Reset ---------------- //
export const resetFilter = () => {
  return {
    type: RESET_FILTER,
  };
};

// ----------- Save value filter  ----------- //
export const saveValueFilter = (key, value) => {
  return {
    type: SAVE_FILTER_VALUE,
    payload: { key, value },
  };
};
