import ButtonReset from "./ButtonReset/ButtonReset";
import FilterDiets from "./FilterDiets/FilterDiets";
import FilterHealthScore from "./FilterHealthScore/FilterHealthScore";
import s from "./Filters.module.css";
import OrderList from "./OrderList/OrderList";
const Filters = () => {
  return (
    <div className={s.filter_container}>
      <FilterDiets />
      <OrderList />
      <FilterHealthScore />
      <ButtonReset />
    </div>
  );
};

export default Filters;
