import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../redux/actions";
import Card from "../../components/Card/Card";
import s from "./Home.module.css";
const { default: axios } = require("axios");

function Home(props) {
  const [recipes, setRecipes] = useState("");
  const [errorSearch, setErrorSearch] = useState("");

  const [flag, setFlag] = useState(true);
  // Dispatch
  const dispatch = useDispatch();
  // useSelector para traerme el estado recipes
  const data = useSelector((state) => state.recipes);
  // useSelector para traerme el estado filterRecipes
  const dataFilter = useSelector((state) => state.filterRecipes);
  // useSelector para traerme el estado diets
  const diets = useSelector((state) => state.diets);

  const handleChange = (e) => {
    setRecipes(e.target.value);
  };

  // Funcion para filtrar por tipos de dietas
  const handlerFilter = (e) => {
    dispatch(action.filterDiets(e.target.value));
    e.target.value === "Show All" ? setFlag(true) : setFlag(false);
  };

  // Funcion para ordenar alfabeticamente
  const handlerOrder = (e) => {
    dispatch(action.orderRecipes(e.target.value));
  };

  // Function para ordenar por healthScore
  const orderHealScore = (e) => {
    dispatch(action.orderHealScore(e.target.value));
  };
  // Funcion para buscar recetas
  const onSearch = async (e) => {
    // Esto deberia pasarlo a useEffect
    e.preventDefault();
    await axios
      .get(`http://localhost:3001/recipes?title=${recipes}`)
      .then((res) => {
        dispatch(action.addRecipes(res.data));
      })
      .catch((error) =>
        setErrorSearch(`No se encontro resultados con ${recipes}`)
      );
    // console.log(result);
  };

  useEffect(() => {
    // Esto deberia guardarlo en redux
    dispatch(action.addDiets);
  }, []);

  // console.log(dataFilter);
  return (
    <div className={s.container}>
      <div>
        <label htmlFor="">Filtrado: </label>
        <select onChange={handlerFilter}>
          <option hidden>Filter</option>
          <option value="Show All">Show All</option>
          {diets.map((e, i) => (
            <option key={i} value={e.name}>
              {e.name}
            </option>
          ))}{" "}
          : (<option hidden>Filter</option>)
        </select>
      </div>
      <div>
        <label htmlFor="">Ordenar</label>
        <select onChange={handlerOrder}>
          <option hidden>Order:</option>
          <option value="Ascendente">Ascendente</option>
          <option value="Descendente">Descendente</option>
        </select>
        <label htmlFor="">Heal Score</label>
        <select onChange={orderHealScore}>
          <option hidden>Order Heal Score:</option>
          <option value="Hight-low">Alto a bajo</option>
          <option value="Low-hight">Bajo a alto</option>
        </select>
      </div>
      <label htmlFor="">Search:</label>
      <form onSubmit={onSearch} action="">
        <input type="text" onChange={handleChange} name={recipes} id="" />
        <button type="submit">Buscar</button>
      </form>
      <h4>{errorSearch && errorSearch}</h4>
      <section className={s.container_cards}>
        {flag
          ? data?.map((e) =>
              e.dataBase ? (
                <Card
                  key={`db  ${e.id}`}
                  name={e.title}
                  image="https://via.placeholder.com/150"
                  diets={e.typediets.map((diet) => diet.name)}
                />
              ) : (
                <Card
                  key={e.id}
                  name={e.title}
                  diets={e.diets}
                  image={e.image}
                />
              )
            )
          : dataFilter?.map((e) =>
              e.dataBase ? (
                <Card
                  key={`db  ${e.id}`}
                  name={e.title}
                  image="https://via.placeholder.com/150"
                  diets={e.typediets.map((diet) => diet.name)}
                />
              ) : (
                <Card
                  key={e.id}
                  name={e.title}
                  diets={e.diets}
                  image={e.image}
                />
              )
            )}
      </section>
      <div>Aca va a estar el paginado</div>
    </div>
  );
}
export default Home;
