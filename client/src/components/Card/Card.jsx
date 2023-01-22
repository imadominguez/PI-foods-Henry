import s from "./Card.module.css";

const Card = (props) => {
  const { diets } = props;

  return (
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
          <div>
            {Array.isArray(diets) ? (
              diets.map((e, i) => <span key={e}>{e} </span>)
            ) : (
              <h3>No se encontro nada rey</h3>
            )}
          </div>
        </div>
        <div className={s.ribbonBot}></div>
      </div>
    </article>
  );
};

export default Card;