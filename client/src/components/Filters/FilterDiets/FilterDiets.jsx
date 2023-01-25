import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../redux/actions";
import s from "./FilterDiets.module.css";

const FilterDiets = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector((state) => state.filterValue);

  console.log(filterValue);
  // Funcion para filtrar por tipos de dietas
  const handlerFilter = (e) => {
    dispatch(action.filterDiets(e.target.value));
    dispatch(action.saveValueFilter("filter", e.target.value));
  };
  // useSelector para traerme el estado diets
  const diets = useSelector((state) => state.diets);
  return (
    <div>
      <select
        className={s.select}
        onChange={handlerFilter}
        value={filterValue.filter ? filterValue.filter : ""}
      >
        <option hidden>Filter</option>
        {/* <option value="Show All">Show All</option> */}
        {/* Mapeado de las dietas */}
        {diets.map((e, i) => (
          <option key={i} value={e.name} className={s.option}>
            {e.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDiets;
