import { useEffect, useState } from 'react'
import { PeopleList } from './PeopleList';

function App() {
  // const [people, setPeople] = useState([]);
  const [pickedPeople, setPickedPeople] = useState([]);
  const [unpickedPeople, setUnpickedPeople] = useState([]);
  const [pickedPerson, setPickedPerson] = useState(null);

  useEffect(() => {
    fetchAllPeople()
  }, [])  // Empty array means "run ONLY the first render. Never again."

  useEffect(() => {
    console.log("new picked person")
    if (!pickedPerson) return;
    const newPickedPeople = [...pickedPeople, pickedPerson]
    setPickedPeople(newPickedPeople)
    const newUnpickedPeople = unpickedPeople.filter(p => p !== pickedPerson)
    setUnpickedPeople(newUnpickedPeople)
  }, [pickedPerson]);  // <- means "run every time pickedPerson changes"

  return (
    <>
      <header>
        <h1>People Picker</h1>
        <img style={styles.logo} src="https://play-lh.googleusercontent.com/2A-bF1LdqB8TKZLSfC8tm2_QX47Bp_3RIdt3GqWaTXaaV673Uvt8Jf-s_2cW6mzeJQ=w480-h960-rw" alt="Logo" />
      </header>
      <main>
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
          <p>Picked people will go here eventually</p>
          <PeopleList listOPeople={pickedPeople} /> :

        </section>
      </main>
      <footer>
        <p>Copyright &copy; The best EDP cohort, 2025. All rights reserved.</p>
      </footer>
    </>
  )

  async function fetchAllPeople() {
    let ppl = await fetch("http://localhost:4000/api/people")
      .then(res => res.json())
    setUnpickedPeople(ppl)
    console.log(ppl)
  }

  function pickAPerson() {
    const theRandomPerson = unpickedPeople[Math.floor(Math.random() * unpickedPeople.length)];
    setPickedPerson(theRandomPerson);
  }
}

const styles = {
  logo: {
    height: "50px",
    width: "50px",
    display: "block",
  }
}

export default App
