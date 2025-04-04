import "./footer.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faXTwitter,faLinkedin, faMedium, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Footer (){

  return (
    <footer>
      <div className="fiv-updates">
        <div className="title">
          <h4>Take a Look and Check For <span>FIV</span> Updates! </h4>
        </div>
        <div className="links">
          <a href="http://github.com/fandeta/fiv" target="_blank">
            <FontAwesomeIcon icon={faGithub}/>
          </a>
          <a href="http://fandeta.github.io/fiv" target="_blank">
            <FontAwesomeIcon icon={faGlobe}/>
          </a>
        </div>
      </div>
      <div className="fiv-developer">
        <div className="title">
          <h4>Keep In Touch, with <span>FIV</span> Developer</h4>
        </div>
        <div className="links">
          <a href="http://facebook.com/fandeta7" target="_blank" style={{color:"#0866ff"}}>
            <FontAwesomeIcon icon={faFacebook}/>
          </a>
          <a href="http://x.com/fandeta777" target="_blank">
            <FontAwesomeIcon icon={faXTwitter}/>
          </a>
          <a href="http://github.com/fandeta" target="_blank">
            <FontAwesomeIcon icon={faGithub}/>
          </a>
          <a href="http://linkedin.com/in/fandeta" target="_blank" style={{color:"#0866ff"}}>
            <FontAwesomeIcon icon={faLinkedin}/>
          </a>
          <a href="http://fandeta.medium.com/" target="_blank">
            <FontAwesomeIcon icon={faMedium}/>
          </a>
        </div>
      </div>
      <div className="last-msg">
        <h5>
          Made With 
          <FontAwesomeIcon icon={faHeart}/>
          by <span>Waleed Sameer</span>
        </h5>
      </div>
    </footer>
  )
}