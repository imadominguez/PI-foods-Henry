import s from "./Footer.module.css";
import linkedin from "../../assets/icons/linkedin.png";
import github from "../../assets/icons/github.png";
const Footer = () => {
  return (
    <footer className={s.footer_container}>
      <div className={s.footer_container_ul}>
        <ul className={s.footer_ul}>
          <li className={s.ul_li}>
            <img src={github} alt="github" className={s.footer_img} />
          </li>
          <li className={s.ul_li}>
            <img src={linkedin} alt="linkedin" className={s.footer_img} />
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
