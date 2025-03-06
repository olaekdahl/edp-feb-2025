/* eslint-disable react/prop-types */
import { PersonCard } from "./PersonCard";
export function PeopleList(props) {
  const people = props.listOPeople;
  return (
    <>
      <h1>People list</h1>
      <section style={{ display: "flex", flexWrap: "wrap" }}>
        {people.map(p => <PersonCard key={p.id} person={p} />)}
      </section>
    </>
  )
}