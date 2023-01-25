import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../Card/Card";

import s from "./Pagination.module.css";

const Pagination = () => {
  const [page, setPage] = useState(1);

  const recipes = useSelector((state) => state.filterRecipes);
  const amount = 3;
  const totalPages = Math.ceil(recipes.length / amount);

  const paginated = recipes.slice((page - 1) * amount, page * amount);

  const handlePage = (e) => {
    setPage(e.target.value);
  };

  const indexButton = [];
  for (let i = 1; i <= totalPages; i++) {
    indexButton.push(i);
  }
  return (
    <>
      <div className={s.button_container}>
        {indexButton.map((element, index) => (
          <>
            <button className={s.button} onClick={handlePage} value={element}>
              {element}
            </button>
          </>
        ))}
      </div>
      <div className={s.cards_container}>
        {paginated?.map((e) =>
          e.dataBase ? (
            <Card
              dataBase={e.dataBase}
              key={`db  ${e.id}`}
              id={e.id}
              name={e.title}
              image="https://via.placeholder.com/150"
              diets={e.typediets.map((diet) => diet.name)}
            />
          ) : (
            <Card
              dataBase={false}
              key={e.id}
              name={e.title}
              diets={e.diets}
              image={e.image}
              id={e.id}
            />
          )
        )}
      </div>
    </>
  );
};

export default Pagination;
