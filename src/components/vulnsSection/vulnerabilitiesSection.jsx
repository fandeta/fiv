import "./vulnerabilitiesSection.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import {Link} from "react-router-dom"

export default function VulnerabilitiesSection (props) {
  return (
    <section id="vulnerabilities" className="vulnerabilities">
      <div className="bugs">
        {props.children}
      </div>
  </section>
  )
}

export function Bug(props) {
  return (
    <div className="bug SR-bottom">
      <img src={props.imgSrc} alt="Vulnerability_Image" /> 
        <Link to={props.goTo}>
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </Link>
    </div>
  )
}