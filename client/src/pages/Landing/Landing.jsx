import React from "react";
import { Link } from "react-router-dom";
import s from "./Landing.module.css";
function Landing(props) {
  return (
    <div className={s.container}>
      <div>
        <h1>PI Foods Henry - Imanol Dominguez</h1>
      </div>
      <div>
        <Link to="/home" className={s.home__link}>
          Ingresar
        </Link>
      </div>
    </div>
  );
}

export default Landing;
