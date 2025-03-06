/* eslint-disable react/prop-types */
import './PersonCard.css';

export function PersonCard(props) {
  const person = props.person
  return (
    <section className="PersonCard">
      <p>{person.firstName} {person.lastName}</p>
      <img src={person.photoUrl} alt="" />
      <p>{person.email}</p>
      <p>{person.phone}</p>
    </section>
  )
}