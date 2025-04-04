import "./aside.css"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"
export default function AsideMenu() {
  return (
    <>
      <div className="overlay"></div>
        <button className="toggle hidden">
          <FontAwesomeIcon icon={faAngleDoubleRight}
          onClick={(event)=>  {
            // [-] Toggle Aside Menu (Articles Menu)
            event.target.classList.toggle("open")
            document.querySelector("aside").classList.toggle("hidden")
            document.querySelector("button.toggle").classList.toggle("hidden")
            document.querySelector("div.overlay").classList.toggle("show")
            // [-] Select the Item based on the path
              let all_lis = document.querySelectorAll("aside ul li")
              all_lis.forEach(li => {
                if (li.children[0].pathname == location.pathname) li.classList.add("active")
                else li.classList.remove("active")
              })
            }
          }
          />
        </button>
      <aside className="hidden">
        <ul>
          <li className="active"><Link to="/xss">XSS</Link></li>
          <li><Link to={"/d-xss"}>DOM - XSS</Link></li>
          <li><Link to={"/s-xss"}>Stored - XSS</Link></li>
          <li><Link to={"/r-xss"}>Reflected - XSS</Link></li>
          <li><Link to={"/csrf"}> CSRF</Link></li>
          <li><Link to={"/ssrf"}> SSRF</Link></li>
          <li><Link to={"/os-injection"}>OS-Command </Link></li>
          <li><Link to={"/sqli"}>SQL Injection </Link></li>
          <li><Link to={"/lfi"}>LFI </Link></li>
          <li><Link to={"/rfi"}> RFI</Link></li>
          <li><Link to={"/path-traversal"}>Path Travesal </Link></li>
          <li><Link to={"/file-upload"}>File Upload </Link></li>
          <li><Link to={"/xxe"}> XXE</Link></li>
        </ul>
      </aside>
    </>
  )
}

/**
 * - Dynamic Aside To Ensure The Current Article is Selected Successfully!
 */