import { useDispatch } from "react-redux";
import * as action from "../../../redux/actions";
import s from "./ButtonReset.module.css";

const ButtonReset = () => {
  const dispatch = useDispatch();
  // ------- Funcion reset filtros ------------
  const handleReset = () => {
    dispatch(action.resetFilter());
  };
  return (
    <div>
      <button type="reset" onClick={handleReset} className={s.reset__link}>
        Reset
      </button>
    </div>
  );
};

export default ButtonReset;
