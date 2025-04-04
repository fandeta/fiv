import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import "./landing.css"

export default function LandingSection() {

  return (
    <section className={"landing "} >
      <div className="welcome-msg SR-left">
        <h1>Ready to hack? Welcome to <span>FIV</span></h1>
        <p><b>FIV</b> is a deliberately vulnerable web application designed to simulate and practice common web security vulnerabilities through interactive labs.</p>
        <a href="#">
          <button>Enter the Labs</button>
        </a>
      </div>
      {/* Button To Scroll To The Next Section */}
      <a href="#vulnerabilities">
        <FontAwesomeIcon icon={faAngleDoubleDown}/>
      </a> 
      <span>Scroll To Vulnerabilities Articles</span>
  </section>
  )
} 