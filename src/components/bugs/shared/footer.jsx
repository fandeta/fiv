import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faXTwitter, faFacebook, faMedium, faLinkedin  } from "@fortawesome/free-brands-svg-icons" 
import "./footer.css"


export default function Footer() {
  return (
    <div className="article-footer">
      <h4>FIV Updates
        <a
        href="http://github.com/fandeta/fiv"
        target="_blank" 
        style={{color: "initial",textDecoration: "underline"}}
        >
        <br/>
        <FontAwesomeIcon icon={faGithub} style={{marginTop: "10px"}}/>
      </a>
      </h4>
      <div className="links">
        <h4>Follow FIV creator </h4>
        <div>
          <a href="https://fandeta.github.io" target="_blank" >
          <FontAwesomeIcon icon={faGithub}/>
          </a>
          <a href="https://x.com/fandeta777" target="_blank" >
          <FontAwesomeIcon icon={faXTwitter}/>
          </a>
          <a href="https://facebook.com/fandeta7" target="_blank" >
            <FontAwesomeIcon icon={faFacebook}/>
          </a>
          <a href="https://fandeta.medium.com" target="_blank" >
            <FontAwesomeIcon icon={faMedium}/>
          </a>
          <a href="https://linkedin.com/fandeta" target="_blank" >
            <FontAwesomeIcon icon={faLinkedin}/>
          </a>
        </div>
      </div>
    </div>
  )
}