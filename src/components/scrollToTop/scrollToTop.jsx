import "./scrollToTop.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function ScrollToTop(){
  // Onload => to Ensure the page is loaded and The Elements is Rendered Successfully!
  window.onload = function () {
    // onScroll => To Make The button only shown if The use is scrolled more Than 700px vertical 
    window.onscroll = function () {
      let theBtn = document.querySelector("button.scroll-top")
      scrollY > 700 ? theBtn.style.display = "block" : theBtn.style.display = "none"
    }
    window.ontouchstart = function () {
      let theBtn = document.querySelector("button.scroll-top")
      scrollY > 700 ? theBtn.style.display = "block" : theBtn.style.display = "none"
    }
  }
  function inClick() {scrollTo({top: 0,left: 0})}
  return (
    <button onClick={inClick} className="scroll-top" style={{display:"none"}}>
      <FontAwesomeIcon icon={faLongArrowUp}/>
    </button>
  )
}
