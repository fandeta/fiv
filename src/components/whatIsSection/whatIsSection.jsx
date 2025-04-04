// /* eslint-disable no-unused-vars */
import "./whatIsSection.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMinus ,faPlus } from "@fortawesome/free-solid-svg-icons";


export default function WhatIsSection(props) {
  return (
    <section className="what-is-fiv" id="what-is-fiv">
    <div className="questions">
      {props.children}
    </div>
  </section>
  )
}




export function Question(props) {
  // [-] Simple Function to Toggle the FontAwesome Icons
  function showContent (clickEvent) {
    clickEvent.target.parentElement.nextSibling.classList.toggle("show")
    clickEvent.target.previousSibling.previousSibling.classList.toggle("hidden")
    clickEvent.target.previousSibling.classList.toggle("hidden")
  }
  return (
    <div className={"question SR-bottom" }>
    <div >
      <FontAwesomeIcon 
      icon={faMinus} className="hidden"
      />
      <FontAwesomeIcon 
      icon={faPlus} onClick={showContent}
      />
      <p onClick={showContent}>
        {props.theQuestion}</p>
    </div>
    <p className="hidden">
      {props.children}
      </p>
  </div>
  )
}
