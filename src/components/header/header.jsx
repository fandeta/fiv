import "./header.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function Header () {
  // 4 The button to Toggle the menu 
  function toggleMenu(event){
    event.target.classList.toggle("active")
  }
  // 4 Closing the menu after click on anylink
  function closeMenu(event) {
    event.target.parentElement.parentElement.parentElement.previousSibling.classList.toggle("active")
  }

  return (
    <header>
      <div className="logo">
        <h4>
          <Link to={"/"} style={{color: "var(--main-color)"}}>FIV</Link>
        </h4>
        <p className="logo-desc">
          Fandeta Is Vulnerable
        </p>
      </div>
      {/* <FontAwesomeIcon icon={faHeart} /> */}
        <FontAwesomeIcon icon={faBars} className="menu"
          onClick={toggleMenu}/>
      <div className="links">
        <ul>
          <li>
            <a href="#what-is-fiv" onClick={closeMenu}>What's FIV?</a></li>
          <li>
            <a href="#about-me" onClick={closeMenu}>About Me</a>
            </li>
          <li>
            <a href="#vulnerabilities" onClick={closeMenu}>Vulnerabilities</a>
          </li>
          <li className="active">
            <a href="#soon" onClick={closeMenu} >Start Hacking</a>
            </li>
        </ul>
      </div>
    </header>
  )
}