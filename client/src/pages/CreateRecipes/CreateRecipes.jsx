import { useEffect } from "react";
import { useState } from "react";
import s from "./CreateRecipes.module.css";
import Validation from "./Validation";
const { default: axios } = require("axios");

const CreateRecipes = (props) => {
  const [userData, setUserData] = useState({
    title: "",
    summary: "",
    healthScore: 0,
    stepByStep: "",
    dietsTypes: [],
  });
  const [errors, setErrors] = useState({
    title: "",
    summary: "",
    healthScore: 0,
    stepByStep: "",
  });

  const [diets, seDiets] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      errors.title === "" &&
      errors.summary === "" &&
      errors.healthScore === 0 &&
      errors.stepByStep === ""
    ) {
      axios
        .post("http://localhost:3001/recipes", userData)
        .then((res) => console.log("receta creada correctamente"))
        .catch((error) => console.log(error.message));
    } else {
      console.log("Te faltan datos para enviar");
    }
    setUserData({
      title: "",
      summary: "",
      healthScore: 0,
      stepByStep: "",
      dataBase: true,
      dietsTypes: [],
    });
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
    async function diets() {
      const diets = await axios.get("http://localhost:3001/diets");
      seDiets(diets.data);
    }
    diets();
  }, []);
  return (
    <div className={s.container}>
      <form action="" method="post" className={s.form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Title:</label>
          <input type="text" name="title" id="" onChange={handleInputChange} />
          {errors.title ? <span>{errors.title}</span> : ""}
        </div>
        <div>
          <label htmlFor="">Summary:</label>
          <textarea
            name="summary"
            id=""
            cols="30"
            rows="10"
            onChange={handleInputChange}
          ></textarea>
          {errors.summary ? <span>{errors.summary}</span> : ""}
        </div>
        <div>
          <label htmlFor="">HealthScore:</label>
          <input
            type="number"
            name="healthScore"
            id=""
            onChange={handleInputChange}
          />
          {errors.healthScore !== 0 && <span>{errors.healthScore}</span>}
        </div>
        <div>
          <label htmlFor="">Steps of steps:</label>
          <textarea
            name="stepByStep"
            id=""
            cols="30"
            rows="10"
            onChange={handleInputChange}
          ></textarea>
          {errors.stepByStep && <span>{errors.stepByStep}</span>}
        </div>
        <div>
          {diets?.map((diet) => {
            return (
              <>
                <label key={diet.name}>{diet.name}</label>
                <input
                  key={diet.id}
                  type="checkbox"
                  name={diet.id}
                  onChange={handleCheckbox}
                />
                {/* e.target.name = name || e.target.checked = true|false ||  */}
              </>
            );
          })}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipes;
