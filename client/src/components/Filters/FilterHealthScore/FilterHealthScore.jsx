import { useDispatch, useSelector } from "react-redux";

import * as action from "../../../redux/actions";
import s from "./FilterHealthScore.module.css";

const FilterHealthScore = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector((state) => state.filterValue);

  // Function para ordenar por healthScore
  const orderHealScore = (e) => {
    dispatch(action.orderHealScore(e.target.value));
    dispatch(action.saveValueFilter("healthscore", e.target.value));
  };

  return (
    <div>
      {/* <label htmlFor="">Heal Score: </label> */}
      <select
        className={s.select}
        onChange={orderHealScore}
        value={filterValue.healthscore ? filterValue.healthscore : ""}
      >
        <option hidden>Order Heal Score</option>
        <option className={s.select_option} value="Hight-low">
          Alto a bajo
        </option>
        <option className={s.select_option} value="Low-hight">
          Bajo a alto
        </option>
      </select>
    </div>
  );
};

export default FilterHealthScore;
