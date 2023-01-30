import { useSelector } from "react-redux";
import ButtonReset from "./ButtonReset/ButtonReset";
import FilterDiets from "./FilterDiets/FilterDiets";
import FilterHealthScore from "./FilterHealthScore/FilterHealthScore";
import s from "./Filters.module.css";
import OrderList from "./OrderList/OrderList";
const Filters = () => {
  const filters = useSelector((state) => Object.keys(state.selectFilter));

  return (
    <div className={s.filter_container}>
      <FilterDiets />
      <OrderList />
      <FilterHealthScore />
      <ButtonReset />
      <div className={s.filters_ul}>
        <h3>Filtros activos:</h3>
        <ul>
          {filters?.map((elem) => (
            <li key={elem}>{elem}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filters;
