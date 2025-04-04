export default function ArticlePart (props) {
  // I know Its not Important but its WIll make the project more structured, `Fandeta was here!`
  return (
    <div className={props.className}>
      {props.children}
    </div>
  )
}