
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import ScrollReveal from "scrollreveal";
import "./sectionTitle.css"

export default function SectionTitle(props) {
  useEffect(() => {
    ScrollReveal().reveal(".scroll-effect", {
      reset: true,
      distance: "40px",
      duration: 1500,
      origin: "top",
    });
  }, []);
  return (
    <h2 className={"section-title scroll-effect"}>
      <FontAwesomeIcon icon={faQuoteLeft} />
        {props.sectionName}
      <FontAwesomeIcon icon={faQuoteRight} />
  </h2>
  )
}
