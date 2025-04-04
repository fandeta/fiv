import "./auther.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShare, faHeart, faCirclePlus, faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export default function Auther(props) {
  return (
    <div className="auther">
    <h3>
      {props.children}
    </h3>
      <div className="arthur-info">
        <div className="image">
          <img src={props.imageSrc} alt="Profile_Image"/>
        </div>
        <div className="info">
          <h6><a href="https://facebook.com/fandeta7" target="_blank">{props.autherName}</a></h6>
          <p><span>{props.readTime}</span> Minutes</p>
        </div>
      </div>
      <div className="like-follow">
        <div>
          <FontAwesomeIcon icon={faHeart} className="like" onClick={
            (eve) => eve.target.classList.toggle("like")
          }/>
          <FontAwesomeIcon icon={faCirclePlus} 
          onClick={
            (eve) => {
              eve.target.style.display = "none"
              eve.target.nextSibling.style.display = "initial"
            }
            }/>
          <FontAwesomeIcon icon={faCircleCheck} style={{display: "none"}} 
          onClick={
            (eve)=>{
              eve.target.style.display = "none"
              eve.target.previousSibling.style.display = "initial"
            }
            }/>
        </div>
          <FontAwesomeIcon icon={faShare}/>
      </div>
    </div>
  )
}
