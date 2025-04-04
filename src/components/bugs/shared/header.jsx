import "./header.css"
import { Link } from "react-router-dom"
export default function BugHeader(props) {
  return (
    <header className="article-header">
      <div className="logo">
        <Link to={"/"}>
          <h4>FIV</h4>
        </Link>
        <p className="logo-desc">
          Fandeta Is Vulnerable
        </p>
      </div>
      <div className="article-name">
        <h2>{props.articleName}</h2>
      </div>
      <div className="links">
        <ul>
          <li className="active">
            <a href="#soon">{props.LabName}</a>
            </li>
        </ul>
      </div>
    </header>
  )
}
