import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../redux/actions";

const FilterDiets = () => {
  const dispatch = useDispatch();
  // Funcion para filtrar por tipos de dietas
  const handlerFilter = (e) => {
    dispatch(action.filterDiets(e.target.value));
  };
  // useSelector para traerme el estado diets
  const diets = useSelector((state) => state.diets);
  return (
    <div>
      <label htmlFor="">Filtrado: </label>
      <select onChange={handlerFilter}>
        <option hidden>Filter</option>
        <option value="Show All">Show All</option>
        {/* Mapeado de las dietas */}
        {diets.map((e, i) => (
          <option key={i} value={e.name}>
            {e.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDiets;
