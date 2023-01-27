import s from "./Footer.module.css";
import linkedin from "../../assets/icons/linkedin.svg";
import github from "../../assets/icons/githubg.svg";

const Footer = () => {
  return (
    <footer className={s.footer_container}>
      <div className={s.footer_container_ul}>
        <ul className={s.footer_ul}>
          <a
            href="https://github.com/imadominguez"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li className={s.ul_li}>
              <img src={github} alt="github" className={s.footer_img} />
            </li>
          </a>
          <li>© Imanol Dominguez Sanchez 2023</li>
          <a
            href="https://www.linkedin.com/in/imanoldominguez/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li className={s.ul_li}>
              <img src={linkedin} alt="linkedin" className={s.footer_img} />
            </li>
          </a>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
