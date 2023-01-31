import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as action from "../../redux/actions";
import s from "./Detail.module.css";
const { default: axios } = require("axios");

const Detail = () => {
  const { id, dataBase } = useParams();
  const [detailrecipe, setdetailrecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(detailrecipe);
  const parseoHtml = (text) => {
    const pattern = /<[^>]*>/gi;
    const parseo = text?.replace(pattern, "");
    return parseo;
  };

  const deleteRecipe = (id) => {
    history.push("/home");
    dispatch(action.deleteRecipe(id));
  };

  const handleSubmit = (e) => {
    e.prevetDefault();
    dispatch(action.updateRecipe(detailrecipe, id));
  };
  const handleInputChange = (e) => {
    setdetailrecipe({ ...detailrecipe, [e.target.name]: e.target.value });
  };
  const handleCheckbox = () => {};

  const getDetail = async (id, dataBase) => {
    await axios
      .get(`http://localhost:3001/recipes/${id}/${dataBase}`)
      .then((res) => setdetailrecipe(res.data))
      .catch((err) => alert(err.message));
  };
  useEffect(() => {
    function getRecipe() {
      setLoading(true);
      getDetail(id, dataBase);
      setTimeout(() => setLoading(false), 1500);
    }
    getRecipe();
  }, []);

  if (loading) {
    return (
      <div className={s.container_loading}>
        {console.log("loader")}
        <span className={s.loader}></span>
      </div>
    );
  } else {
    return (
      <div className={s.container_detail}>
        <div className={s.container}>
          <div className={s.image}>
            <div className={s.image_container}>
              <img
                src={
                  detailrecipe.image
                    ? detailrecipe.image
                    : "https://via.placeholder.com/150"
                }
                className={s.img}
                alt={detailrecipe.title}
              />
            </div>
          </div>
          <div className={s.title}>
            <h1>{detailrecipe.title}</h1>
          </div>
          <div className={s.summary}>
            <p>{parseoHtml(detailrecipe.summary)}</p>
          </div>
          <div className={s.helathscore}>
            <div>{detailrecipe.healthScore}</div>
            <div>
              {detailrecipe.dishTypes?.map((e) => (
                <span key={e}>{e}</span>
              ))}
            </div>
          </div>
          <div className={s.diets}>
            {detailrecipe.dataBase
              ? detailrecipe.typediets?.map((e) => (
                  <span key={e.id}>{e.name}</span>
                ))
              : detailrecipe.diets?.map((e) => <span key={e}>{e}</span>)}
          </div>
          <div className={s.instructions}>
            <p>
              {detailrecipe.instructions
                ? detailrecipe.instructions
                : detailrecipe.stepByStep}
            </p>
          </div>
        </div>
        <div className={s.button_container}>
          {detailrecipe.dataBase && (
            <button onClick={() => deleteRecipe(id)}>Eliminar</button>
          )}
          {detailrecipe.dataBase && <button>Actualizar</button>}
        </div>
      </div>
    );
  }
};

export default Detail;
