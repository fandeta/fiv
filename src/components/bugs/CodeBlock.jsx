import "./code-block.css"
import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
// [-] To Write the Block Codes.

export default function CodeBlock ({ code, language }){
  useEffect(() => {
    hljs.highlightAll(); // Apply highlighting to all code blocks
  }, [])
  function copyToClipBoard(ClickEvent) {
    ClickEvent.target.classList.add("hidden") // To Hide The First SVG Icon
    ClickEvent.target.nextSibling.classList.toggle("hidden") // To Show The Next SVG Icon
    navigator.clipboard.writeText(ClickEvent.target.nextSibling.nextSibling.innerText)// To Copy The Code Text Inside Clipboard
  }
  return (
    <pre>
      <FontAwesomeIcon icon={faClipboard} onClick={copyToClipBoard} />
      <FontAwesomeIcon icon={faClipboardCheck}  className="hidden" 
      onClick={(eve)=>{
        navigator.clipboard.writeText(eve.target.nextSibling.innerText)
      }}
      />
      <code className={language}  >
        {code}
      </code>
    </pre>
  )
}

