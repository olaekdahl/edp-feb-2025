/* eslint-disable react/prop-types */
import { PersonCard } from "./PersonCard";
import './PeopleList.css';

export function PeopleList(props) {
  const people = props.listOPeople;
  return (
    <section className="PeopleList">
      {people.map(p => <PersonCard key={p?.id} person={p} />)}
    </section>
  )
}