import {
  FILTER_DIETS,
  ADD_RECIPES,
  ORDER_RECIPES,
  ORDER_HEALSCORE,
} from "./actions";

const initialState = {
  recipes: [],
  filterRecipes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        filterRecipes: action.payload,
      };

    case FILTER_DIETS:
      let filtered = state.recipes.filter((e) => {
        return e.dataBase
          ? e.typediets.some((e) => e.name.includes(action.payload))
          : e.diets.includes(action.payload);
      });
      return { ...state, filterRecipes: filtered };
    case ORDER_RECIPES:
      return {
        ...state,
        recipes: [...state.recipes].sort((a, b) => {
          return action.payload === "Descendente"
            ? a.title > b.title
              ? -1
              : b.title < a.title
              ? 1
              : 0
            : a.title < b.title
            ? -1
            : b.title > a.title
            ? 1
            : 0;
        }),
        filterRecipes: [...state.filterRecipes].sort((a, b) => {
          return action.payload === "Descendente"
            ? a.title > b.title
              ? -1
              : b.title < a.title
              ? 1
              : 0
            : a.title < b.title
            ? -1
            : b.title > a.title
            ? 1
            : 0;
        }),
      };
    case ORDER_HEALSCORE:
      return {
        ...state,
        recipes: [...state.recipes].sort((a, b) => {
          return action.payload === "Hight-low"
            ? a.healthScore - b.healthScore
            : b.healthScore - a.healthScore;
        }),
        filterRecipes: [...state.filterRecipes].sort((a, b) => {
          return action.payload === "Hight-low"
            ? a.healthScore - b.healthScore
            : b.healthScore - a.healthScore;
        }),
      };
    default:
      return { ...state };
  }
};
console.log(initialState.filterRecipes);
export default reducer;

/* 

case SEARCHBYTYPE:
      return {
        ...state,
        filteredByType: state.pokemons.filter(
          (pokemon) => pokemon.types.includes(actions.payload)
        ),
      };
case SEARCHBYMULTIPLETYPES:
      return {
        ...state,
        filteredByType: state.pokemons.filter(
          (pokemon) => actions.payload.every((type) => pokemon.types.includes(type))
        ),
      };
import { SEARCHBYMULTIPLETYPES } from './actionTypes';

export const searchByMultipleTypes = (types) => {
  return {
    type: SEARCHBYMULTIPLETYPES,
    payload: types,
  }
}


component

import { searchByMultipleTypes } from './actions';

function MyComponent() {
  const dispatch = useDispatch();
  const handleFilter = (types) => {
    dispatch(searchByMultipleTypes(types));
  }

  return (
    <div>
      <button onClick={() => handleFilter(['fire', 'dragon'])}>Filter by Fire and Dragon</button>
    </div>
  )
}

*/
