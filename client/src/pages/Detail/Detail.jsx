import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import s from "./Detail.module.css";
const { default: axios } = require("axios");

const Detail = () => {
  const { id, dataBase } = useParams();
  const [detailrecipe, setdetailrecipe] = useState({});
  console.log(detailrecipe);
  const getDetail = async (id, dataBase) => {
    const response = await axios.get(
      `http://localhost:3001/recipes/${id}/${dataBase}`
    );
    setdetailrecipe(response.data);
  };
  console.log(detailrecipe);
  const parseoHtml = (text) => {
    const pattern = /<[^>]*>/gi;
    const parseo = text?.replace(pattern, "");
    return parseo;
  };
  useEffect(() => {
    async function getRecipe() {
      await getDetail(id, dataBase);
    }
    getRecipe();
  }, []);
  return (
    <div className={s.container_detail}>
      <div className={s.container}>
        <div className={s.image}>
          <div className={s.image_container}>
            <img
              src={detailrecipe.image}
              className={s.img}
              alt={detailrecipe.title}
            />
          </div>
        </div>
        <div className={s.title}>
          <h1>{detailrecipe.title}</h1>
        </div>
        <div className={s.summary}>
          <p>{parseoHtml(detailrecipe?.summary)}</p>
        </div>
        <div className={s.helathscore}>
          <div>{detailrecipe?.healthScore}</div>
          <div>
            {detailrecipe.dishTypes?.map((e) => (
              <span key={e}>{e}</span>
            ))}
          </div>
        </div>
        <div className={s.diets}>
          {detailrecipe.diets?.map((e) => (
            <span key={e}>{e}</span>
          ))}
        </div>
        <div className={s.instructions}>
          <p>{detailrecipe?.instructions}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
