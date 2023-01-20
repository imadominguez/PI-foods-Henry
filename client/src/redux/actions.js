export const FILTER_DIETS = "FILTER_DIETS";
export const ADD_RECIPES = "ADD_RECIPES";
export const ORDER_RECIPES = "ORDER_RECIPES";
export const ORDER_HEALSCORE = "ORDER_HEALSCORE";
export const filterDiets = (diet) => {
  return {
    type: FILTER_DIETS,
    payload: diet,
  };
};

export const addRecipes = (recipes) => {
  return {
    type: ADD_RECIPES,
    payload: recipes,
  };
};

export const orderRecipes = (value) => {
  console.log("estoy en actions orderRecipes");
  return {
    type: ORDER_RECIPES,
    payload: value,
  };
};

export const orderHealScore = (value) => {
  return {
    type: ORDER_HEALSCORE,
    payload: value,
  };
};
