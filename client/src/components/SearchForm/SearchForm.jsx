import { useState } from "react";
import { useDispatch } from "react-redux";
import * as action from "../../redux/actions";
import s from "./SearchForm.module.css";
import search from "../../assets/icons/search.svg";

const SearchForm = () => {
  // Estado local del nombre de la receta del buscador
  const [recipes, setRecipes] = useState("");

  const dispatch = useDispatch();
  //  Funcion onchange del input que busca la receta
  const handleChange = (e) => {
    setRecipes(e.target.value);
  };
  // Function onSearch en la cual hago dispatch para buscar la receta
  const onSearch = async (e) => {
    e.preventDefault();
    dispatch(action.addRecipes(recipes));
  };
  return (
    <form onSubmit={onSearch} action="">
      <input
        placeholder="Busca una receta"
        className={s.input}
        type="text"
        onChange={handleChange}
        name={recipes}
        id=""
      />
      <button className={s.button} type="submit">
        <span>Buscar</span>
        <img src={search} alt="" className={s.img} />
      </button>
    </form>
  );
};

export default SearchForm;
