import { useState } from 'react'
import { PeopleList } from './PeopleList';

function App() {
  const [people, setPeople] = useState([]);
  return (
    <>
      <h1>People Picker</h1>
      <img style={styles.logo} src="https://play-lh.googleusercontent.com/2A-bF1LdqB8TKZLSfC8tm2_QX47Bp_3RIdt3GqWaTXaaV673Uvt8Jf-s_2cW6mzeJQ=w480-h960-rw" alt="Logo" />
      <button onClick={() => fetchAllPeople()}>Reset</button>
      <button>Pick victim</button>
      <h2>Picked person</h2>
      <div>Picked person will go here eventually</div>
      <h2>Unpicked people</h2>
      <div>unpicked people will go here eventually</div>
      <PeopleList listOPeople={people} />
      <h2>Already picked people</h2>
      <div>Picked people will go here eventually</div>
    </>
  )

  async function fetchAllPeople() {
    let people = await fetch("http://localhost:4000/api/people")
      .then(res => res.json())
    setPeople(people)
    console.log(people)
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
