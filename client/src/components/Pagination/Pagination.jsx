import { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import arrowRight from "../../assets/icons/arrowRight.svg";
import arrowLeft from "../../assets/icons/arrowLeft.svg";

import s from "./Pagination.module.css";

const Pagination = () => {
  const [page, setPage] = useState(1);
  const recipes = useSelector((state) => state.filterRecipes);
  const filters = useSelector((state) => Object.keys(state.selectFilter));
  const amount = 9;
  const totalPages = Math.ceil(recipes.length / amount);

  const paginated = recipes.slice((page - 1) * amount, page * amount);

  const handlePage = (e) => {
    setPage(e.target.value);
  };

  const handlePageButton = (e) => {
    if (e === "aument") {
      if (page === totalPages) {
        setPage(1);
      } else {
        setPage(page + 1);
      }
    } else {
      if (page === 1) {
        setPage(totalPages);
      } else {
        setPage(page - 1);
      }
    }
  };
  const indexButton = [];
  for (let i = 1; i <= totalPages; i++) {
    indexButton.push(i);
  }

  return (
    <>
      <div className={s.button_container}>
        <button
          onClick={() => handlePageButton("decrement")}
          className={s.button_arrow}
        >
          <img src={arrowLeft} alt="" />
        </button>
        {indexButton.map((element, index) => (
          <button
            className={`${s.button} ${page === element && `${s.active}`}`}
            onClick={handlePage}
            value={element}
            key={index}
          >
            {element}
          </button>
        ))}
        <button
          onClick={() => handlePageButton("aument")}
          className={s.button_arrow}
        >
          <img src={arrowRight} alt="" />
        </button>
      </div>

      <div className={s.cards_container}>
        {!recipes.length && !filters.length ? (
          <div className={s.container_loading}>
            <span className={s.loader}></span>
          </div>
        ) : (
          paginated?.map((e) =>
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
          )
        )}
      </div>
    </>
  );
};

export default Pagination;
