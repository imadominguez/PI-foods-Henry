import { useDispatch } from "react-redux";
import * as action from "../../../redux/actions";
import s from "./OrderList.module.css";

const OrderList = () => {
  const dispatch = useDispatch();
  // Funcion para ordenar alfabeticamente
  const handlerOrder = (e) => {
    dispatch(action.orderRecipes(e.target.value));
  };
  return (
    <div>
      <select className={s.select} onChange={handlerOrder}>
        <option hidden>Order</option>
        <option value="Ascendente">Ascendente</option>
        <option value="Descendente">Descendente</option>
      </select>
    </div>
  );
};

export default OrderList;
