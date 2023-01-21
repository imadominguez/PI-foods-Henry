import { useState } from "react";
import { useDispatch } from "react-redux";
import * as action from "../../redux/actions";

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
      <input type="text" onChange={handleChange} name={recipes} id="" />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchForm;
