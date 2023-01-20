import React from "react";
import { Link } from "react-router-dom";
import s from "./Landing.module.css";
function Landing(props) {
  return (
    <div className={s.container}>
      <Link to="/home" className={s.home__link}>
        Ingresar
      </Link>
    </div>
  );
}

export default Landing;
