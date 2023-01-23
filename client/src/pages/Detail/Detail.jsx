import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
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
    <div style={{ color: "white" }}>
      <h2>{detailrecipe.title}</h2>
      <h1>{detailrecipe.id}</h1>
      <p>{parseoHtml(detailrecipe?.summary)}</p>
    </div>
  );
};

export default Detail;
