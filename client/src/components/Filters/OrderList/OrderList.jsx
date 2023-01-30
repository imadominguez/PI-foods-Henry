import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../redux/actions";
import s from "./OrderList.module.css";

const OrderList = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector((state) => state.filterValue);
  // Funcion para ordenar alfabeticamente
  const handlerOrder = (e) => {
    dispatch(action.orderRecipes(e.target.value));
    dispatch(action.saveValueFilter("orderlist", e.target.value));
  };
  return (
    <div>
      <select
        className={s.select}
        onChange={handlerOrder}
        value={filterValue.orderlist ? filterValue.orderlist : ""}
      >
        <option hidden>Order</option>
        <option value="Ascendente">Ascendente</option>
        <option value="Descendente">Descendente</option>
      </select>
    </div>
  );
};

export default OrderList;
