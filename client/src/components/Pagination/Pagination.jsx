import { useState } from "react";
import { useSelector } from "react-redux";
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
      <div>
        {indexButton.map((element) => (
          <button onClick={handlePage} value={element}>
            {element}
          </button>
        ))}
      </div>
      <div className={s.cards_container}>
        {paginated?.map((e) =>
          e.dataBase ? (
            <Card
              key={`db  ${e.id}`}
              name={e.title}
              image="https://via.placeholder.com/150"
              diets={e.typediets.map((diet) => diet.name)}
            />
          ) : (
            <Card key={e.id} name={e.title} diets={e.diets} image={e.image} />
          )
        )}
      </div>
    </>
  );
};

export default Pagination;
