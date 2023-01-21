import { useDispatch } from "react-redux";
import * as action from "../../../redux/actions";

const FilterHealthScore = () => {
  const dispatch = useDispatch();
  // Function para ordenar por healthScore
  const orderHealScore = (e) => {
    dispatch(action.orderHealScore(e.target.value));
  };

  return (
    <div>
      <label htmlFor="">Heal Score: </label>
      <select onChange={orderHealScore}>
        <option hidden>Order Heal Score:</option>
        <option value="Hight-low">Alto a bajo</option>
        <option value="Low-hight">Bajo a alto</option>
      </select>
    </div>
  );
};

export default FilterHealthScore;
