import { Link } from "react-router-dom";
import s from "./Navbar.module.css";

import SearchForm from "../SearchForm/SearchForm";
const Navbar = () => {
  return (
    <nav className={s.nav_container}>
      <div>
        <Link className={s.link} to="/">
          INICIO
        </Link>
      </div>
      <div>
        <SearchForm />
      </div>
      <div>
        <Link className={s.link} to="/createrecipes">
          CREA TU RECETA
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
