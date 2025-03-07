/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import "./App.css";
import { AboutUs, ContactUs } from './OtherComponents';
import { PeoplePicker } from './PeoplePicker';

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
      <header id="pageHeader">
        <img style={styles.logo} src="/images/logo.webp" alt="Logo" />
        <Link to="/" className="homeLink">Best EDP Cohort</Link>
        <Link to="/picker">Picker</Link>
        <Link to="/add">Add a Person</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/picker" />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/picker" element={<PeoplePicker fetchAllPeople={fetchAllPeople}
            pickAPerson={pickAPerson}
            pickedPerson={pickedPerson}
            unpickedPeople={unpickedPeople}
            pickedPeople={pickedPeople} />} />
          <Route path="*" element={<Navigate to="/picker" />} />
        </Routes>

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
