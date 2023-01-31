import {
  FILTER_DIETS,
  ADD_RECIPES,
  ORDER_RECIPES,
  ORDER_HEALSCORE,
  GET_DIETS,
  RESET_FILTER,
  SAVE_FILTER_VALUE,
} from "./actions";

const initialState = {
  recipes: [],
  filterRecipes: [],
  diets: [],
  selectFilter: {},
  filterValue: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        filterRecipes: action.payload,
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case FILTER_DIETS:
      // variable nueva que copia todo lo que tenga selecFilter que por defecto viene vacio
      const newSelectFilter = { ...state.selectFilter };

      // en este obj vacio seteamos la propiedad con la key que viene de payload y la seteamos en true
      newSelectFilter[action.payload] = true;
      // creamos nueva variable que es un array de todas las key del objeto
      const filterToApply = Object.keys(newSelectFilter);

      // variable que guarda todas las recetas para despues filtrar
      let newFilteredRecipes = [...state.recipes];

      // recorremos el array con las key del objeto
      filterToApply.forEach((filter) => {
        newFilteredRecipes = newFilteredRecipes.filter((e) => {
          return e.dataBase
            ? e.typediets.some((e) => e.name.includes(filter))
            : e.diets.includes(filter);
        });
      });

      return {
        ...state,
        filterRecipes: newFilteredRecipes,
        selectFilter: newSelectFilter,
      };
    case ORDER_RECIPES:
      return {
        ...state,
        // recipes: [...state.recipes].sort((a, b) => {
        //   return action.payload === "Descendente"
        //     ? a.title > b.title
        //       ? -1
        //       : b.title < a.title
        //       ? 1
        //       : 0
        //     : a.title < b.title
        //     ? -1
        //     : b.title > a.title
        //     ? 1
        //     : 0;
        // }),
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
        // recipes: [...state.recipes].sort((a, b) => {
        //   return action.payload === "Hight-low"
        //     ? a.healthScore - b.healthScore
        //     : b.healthScore - a.healthScore;
        // }),
        filterRecipes: [...state.filterRecipes].sort((a, b) => {
          return action.payload === "Hight-low"
            ? a.healthScore - b.healthScore
            : b.healthScore - a.healthScore;
        }),
      };
    case RESET_FILTER:
      console.log(state.recipes);
      return {
        ...state,
        filterRecipes: [...state.recipes],
        filterValue: {},
        selectFilter: {},
      };
    case SAVE_FILTER_VALUE:
      const { key, value } = action.payload;
      return {
        ...state,
        filterValue: { ...state.filterValue, [key]: value },
      };
    default:
      return { ...state };
  }
};

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
