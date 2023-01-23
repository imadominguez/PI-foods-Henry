import { useDispatch } from "react-redux";
import * as action from "../../../redux/actions";
import s from "./ButtonReset.module.css";
import reset from "../../../assets/icons/reset.svg";

const ButtonReset = () => {
  const dispatch = useDispatch();
  // ------- Funcion reset filtros ------------
  const handleReset = () => {
    dispatch(action.resetFilter());
  };
  return (
    <div>
      <button type="reset" onClick={handleReset} className={s.reset__link}>
        <span>Reset</span> <img src={reset} alt="" />
      </button>
    </div>
  );
};

export default ButtonReset;
