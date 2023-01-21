import { useDispatch } from "react-redux";
import * as action from "../../../redux/actions";

const ButtonReset = () => {
  const dispatch = useDispatch();
  // ------- Funcion reset filtros ------------
  const handleReset = () => {
    dispatch(action.resetFilter());
  };
  return (
    <div>
      <button type="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default ButtonReset;
