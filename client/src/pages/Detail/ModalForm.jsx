import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Validation from "../CreateRecipes/Validation";
import * as action from "../../redux/actions";
import s from "./ModalForm.module.css";
import { useHistory } from "react-router-dom";
const { default: axios } = require("axios");

function ModalForm(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const diets = useSelector((state) => state?.diets);
  const [dataForm, setDataForm] = useState(props.detailrecipe);

  const [errors, setErrors] = useState({});

  const handleDiets = (name, id) => {
    const findDiet = props.detailrecipe.typediets.find((e) => e.id === id);
    props.setdetailrecipe({
      ...props.detailrecipe,
      typediets: !findDiet
        ? [...props.detailrecipe.typediets, { id, name }]
        : props.detailrecipe.typediets.filter((e) => e.id !== id),
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let err = Object.values(errors);
    dataForm.dietTypes = dataForm.typediets.map((elem) => elem.id);
    if (!err.length) {
      axios
        .put(`http://localhost:3001/recipes/${props.detailrecipe.id}`, dataForm)
        .then((res) => {
          alert("receta actualizada correctamente");
          history.push("/home");
        });
      dispatch(action.addRecipes(""));
    } else {
      alert("Datos incorrectos");
      console.log(err);
    }
  };

  const hanbleInputChange = (event) => {
    let property = event.target.name;
    let value = event.target.value;
    setDataForm({ ...dataForm, [property]: value });
    setErrors(Validation({ ...dataForm, [property]: value }));
  };
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
          value={dataForm.title}
          id=""
          placeholder="Ingresa el titulo de la receta"
          onChange={hanbleInputChange}
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
          value={dataForm.summary}
          onChange={hanbleInputChange}
        ></textarea>
      </div>
      <div className={s.form_healthscore}>
        <label htmlFor="">HEALTHSCORE:</label>
        <input
          type="number"
          name="healthScore"
          value={dataForm.healthScore}
          id=""
          placeholder="Ingresa el puntaje de salud 0 - 100"
          onChange={hanbleInputChange}
        />
      </div>
      <div className={s.form_stepbystep}>
        <textarea
          name="stepByStep"
          id=""
          cols="30"
          rows="10"
          value={dataForm.stepByStep}
          placeholder="Ingresa el paso a paso"
          onChange={hanbleInputChange}
        ></textarea>
      </div>
      <div className={s.form_diets}>
        {console.log(diets)}
        {diets?.map((diet, index) => {
          return (
            <div>
              <label key={index}>{diet.name}</label>
              <input
                key={diet.name}
                type="checkbox"
                name={diet.id}
                className={s.checkbox}
                checked={props.detailrecipe.typediets.some(
                  (obj) => obj.id === diet.id
                )}
                onChange={() => handleDiets(diet.name, diet.id)}
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
