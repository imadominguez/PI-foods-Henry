import { Link } from "react-router-dom";
import s from "./Card.module.css";

const Card = (props) => {
  const { diets, dataBase, id } = props;

  return (
    <Link to={`/detail/${id}/${dataBase}`}>
      <article className={s.food_card}>
        <div className={s.food_img}>
          <img src={props.image} alt={props.name} />
        </div>
        <div className={s.food_info}>
          <div className={s.food_info_name}>
            <div className={s.ribbonTop}></div>
            <h3 className={s.name}>{props.name}</h3>
            <hr className={s.hr} />
          </div>
          <div className={s.food_diets}>
            <h3 className={s.name_diets}>Tipos de dietas:</h3>
            <div className={s.diets_container}>
              {diets.map((e, i) => (
                <span className={s.name__diets} key={e}>
                  {e}
                </span>
              ))}
            </div>
          </div>
          <div className={s.ribbonBot}></div>
        </div>
      </article>
    </Link>
  );
};

export default Card;
