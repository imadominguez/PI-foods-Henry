import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as action from "../../redux/actions";
import s from "./CreateRecipes.module.css";
import Validation from "./Validation";
const { default: axios } = require("axios");

const CreateRecipes = (props) => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    title: "",
    summary: "",
    healthScore: null,
    stepByStep: "",
    dietsTypes: [],
  });
  const [errors, setErrors] = useState({
    title: "",
    summary: "",
    healthScore: 0,
    stepByStep: "",
  });
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      errors.title === "" &&
      errors.summary === "" &&
      errors.healthScore === 0 &&
      errors.stepByStep === ""
    ) {
      await axios
        .post("http://localhost:3001/recipes", userData)
        .then((res) => alert("receta creada correctamente"))
        .catch((error) => console.log(error.message));
      setUserData({
        title: "",
        summary: "",
        healthScore: false,
        stepByStep: "",
        dataBase: true,
        dietsTypes: [],
      });
      history.push("/home");
    } else {
      console.log("Te faltan datos para enviar");
    }
  };
  const handleInputChange = (e) => {
    if (e.target.value) {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
      setErrors({
        ...errors,
        ...Validation({
          [e.target.name]: e.target.value,
        }),
      });
    } else {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleCheckbox = (e) => {
    //
    const findType = userData.dietsTypes.find((elem) => elem === e.target.name);
    setUserData({
      ...userData,
      dietsTypes: !findType
        ? [...userData.dietsTypes, e.target.name]
        : userData.dietsTypes.filter((ele) => ele !== e.target.name),
    });
  };

  useEffect(() => {
    dispatch(action.addDiets());
  }, []);
  return (
    <div className={s.container}>
      <form
        className={s.form_container}
        action=""
        method="post"
        onSubmit={handleSubmit}
      >
        <div className={s.form_title}>
          <input
            type="text"
            name="title"
            value={userData.title}
            id=""
            className={`${s.input_title} ${
              errors.title && userData.title
                ? s.red_input
                : !errors.title && userData.title
                ? s.green_input
                : ""
            }`}
            onChange={handleInputChange}
            placeholder="Ingresa el titulo de la receta"
            required
          />
          {errors.title ? (
            <span className={s.red_label}>{errors.title}</span>
          ) : (
            ""
          )}
        </div>
        <div className={s.form_summary}>
          <textarea
            name="summary"
            id=""
            cols="30"
            rows="10"
            onChange={handleInputChange}
            placeholder="Ingresa un resumen"
            autoCapitalize="sentences"
            value={userData.summary}
          ></textarea>
          {errors.summary ? <span>{errors.summary}</span> : ""}
        </div>
        <div className={s.form_healthscore}>
          <input
            type="number"
            name="healthScore"
            value={userData.healthScore}
            id=""
            onChange={handleInputChange}
            required
            placeholder="Ingresa el puntaje de salud 0 - 100"
            className={`${s.input_title} ${
              errors.healthScore && userData.healthScore
                ? s.red_input
                : !errors.healthScore && userData.healthScore
                ? s.green_input
                : ""
            }`}
          />
          {errors.healthScore !== 0 && <span>{errors.healthScore}</span>}
        </div>
        <div className={s.form_stepbystep}>
          <textarea
            name="stepByStep"
            id=""
            cols="30"
            rows="10"
            value={userData.stepByStep}
            onChange={handleInputChange}
            placeholder="Ingresa el paso a paso"
          ></textarea>
          {errors.stepByStep && <span>{errors.stepByStep}</span>}
        </div>
        <div className={s.form_diets}>
          {diets?.map((diet, index) => {
            return (
              <div>
                <label key={index}>{diet.name}</label>
                <input
                  key={diet.name}
                  type="checkbox"
                  name={diet.id}
                  onChange={handleCheckbox}
                  className={s.checkbox}
                />
              </div>
            );
          })}
        </div>
        <div className={s.form_submit}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipes;
