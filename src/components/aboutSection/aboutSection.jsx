import "./aboutSection.css"

export default function VulnerabilitiesSection (props) {
  return (
    <section className="about" id="about-me">
      <div className="cards">
        {props.children}
      </div>
    </section>
  )
}

export function Card(props) {
  return (
    <div className="card SR-bottom">
      <div className="num">
        <span>{props.number}</span>
      </div>
      <div className="info">
        <h3>{props.title}</h3>
        <p>{props.children}</p>
      </div>
  </div>
  )
}