/* eslint-disable react/prop-types */
import { PeopleList } from "./PeopleList"
export const PeoplePicker = ({ fetchAllPeople, pickAPerson, pickedPerson, unpickedPeople, pickedPeople }) => {
  return (
    <>
      <h1>People Picker</h1>
      <div className='topDiv'>
        <section>
          <button onClick={() => fetchAllPeople()}>Reset</button>
          <button onClick={() => pickAPerson()}>Pick victim</button>
        </section>
        {pickedPerson && <section>
          <h2>Picked person</h2>
          <div>{pickedPerson?.firstName}</div>
        </section>}
      </div>
      <section>
        <h2>Unpicked people</h2>
        {unpickedPeople.length > 0 ?
          <PeopleList listOPeople={unpickedPeople} /> :
          <p>All people have been picked.</p>}
      </section>
      <section>
        <h2>Already picked people</h2>
        <PeopleList listOPeople={pickedPeople} />
      </section>
    </>
  )
}