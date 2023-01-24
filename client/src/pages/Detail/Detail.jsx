import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import s from "./Detail.module.css";
const { default: axios } = require("axios");

const Detail = () => {
  const { id, dataBase } = useParams();
  const [detailrecipe, setdetailrecipe] = useState({});

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
    <div class={s.container_detail}>
      <div class={s.container}>
        <div class={s.image}>
          <div className={s.image_container}>
            <img src={detailrecipe.image} className={s.img} alt="" />
          </div>
        </div>
        <div class={s.title}>
          <h1>{detailrecipe.title}</h1>
        </div>
        <div class={s.summary}>
          <p>{parseoHtml(detailrecipe?.summary)}</p>
        </div>
        <div class={s.helathscore}>healthscoreeeee</div>
        <div class={s.instructions}>instructionnssssss</div>
        <div class={s.diets}>dieeeeets</div>
      </div>
    </div>
  );
};

export default Detail;
