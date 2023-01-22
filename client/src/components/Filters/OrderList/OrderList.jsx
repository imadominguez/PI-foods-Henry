import { useDispatch } from "react-redux";
import * as action from "../../../redux/actions";

const OrderList = () => {
  const dispatch = useDispatch();
  // Funcion para ordenar alfabeticamente
  const handlerOrder = (e) => {
    dispatch(action.orderRecipes(e.target.value));
  };
  return (
    <div>
      <label htmlFor="">Order: </label>
      <select onChange={handlerOrder}>
        <option hidden>Order:</option>
        <option value="Ascendente">Ascendente</option>
        <option value="Descendente">Descendente</option>
      </select>
    </div>
  );
};

export default OrderList;