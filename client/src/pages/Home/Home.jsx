import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as action from "../../redux/actions";
import s from "./Home.module.css";
import Pagination from "../../components/Pagination/Pagination";
import Filters from "../../components/Filters/Filters";

function Home() {
  // const recipes = useSelector((state) => state.recipes);
  // const recipesFilter = useSelector((state) => state.recipesFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action.addDiets());
    dispatch(action.addRecipes(""));
  }, [dispatch]);
  return (
    <div className={s.fondo}>
      <div className={s.container}>
        <Filters />
        <section className={s.container_cards}>
          <Pagination />
        </section>
      </div>
    </div>
  );
}
export default Home;
