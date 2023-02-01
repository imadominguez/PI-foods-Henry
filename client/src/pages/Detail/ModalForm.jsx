import s from "./ModalForm.module.css";

function ModalForm(props) {
  const handleSubmit = () => {};
  return (
    <form
      className={s.form_container}
      action=""
      method="post"
      onSubmit={handleSubmit}
    >
      <div className={s.form_title}>
        <label htmlFor="">TITULO:</label>
        <input
          type="text"
          name="title"
          value={props.recipe.title}
          id=""
          placeholder="Ingresa el titulo de la receta"
        />
      </div>
      <div className={s.form_summary}>
        <label htmlFor="">RESUMEN:</label>
        <textarea
          name="summary"
          id=""
          cols="30"
          rows="10"
          placeholder="Ingresa un resumen"
          autoCapitalize="sentences"
          value={props.recipe.summary}
        ></textarea>
      </div>
      <div className={s.form_healthscore}>
        <label htmlFor="">HEALTHSCORE:</label>
        <input
          type="number"
          name="healthScore"
          value={props.recipe.healthScore}
          id=""
          placeholder="Ingresa el puntaje de salud 0 - 100"
        />
      </div>
      <div className={s.form_stepbystep}>
        <textarea
          name="stepByStep"
          id=""
          cols="30"
          rows="10"
          value={props.recipe.stepByStep}
          placeholder="Ingresa el paso a paso"
        ></textarea>
      </div>
      <div className={s.form_diets}>
        {props.recipe.typediets?.map((diet, index) => {
          return (
            <div>
              <label key={index}>{diet.name}</label>
              <input
                key={diet.name}
                type="checkbox"
                name={diet.id}
                className={s.checkbox}
              />
            </div>
          );
        })}
      </div>
      <div className={s.form_submit}>
        <button type="submit">Actualizar</button>
      </div>
    </form>
  );
}

export default ModalForm;
