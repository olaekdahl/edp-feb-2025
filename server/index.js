import express from "express";
import cors from 'cors';
import { addPerson, deletePerson, getPeople, getPersonByFirstName, getPerson, getPersonByObjectId, updatePerson } from "./repositories/postgresRepo.js";
import { MongoClient } from "mongodb";
const app = express();
app.use(express.json());
app.use(cors());

app.get("/knockknock", (req, res) => {
  res.send("Who's there?")
});

// GET request for all the people at "/people"
app.get("/api/people", async (req, res) => {
  res.send(await getPeople());
})

// GET request to get a person by id
app.get("/api/people/:id([0-9]+)", async (req, res) => {
  const id = req.params.id;
  const person = await getPerson(id)
  if (!person) {
    res.status(404).send("No person with that ID")
  }
  res.send(person)
});

// GET request to get a person by ObjectId
app.get("/api/people/:id([a-fA-F0-9]{24})", async (req, res) => {
  const id = req.params.id;
  const person = await getPersonByObjectId(id)
  if (!person) {
    res.status(404).send("No person with that ObjectId")
  }
  res.send(person)
});

// GET request to get a person by firstName
app.get("/api/people/:firstname", async (req, res) => {
  const firstName = req.params.firstname;
  const person = await getPersonByFirstName(firstName)
  if (!person) {
    res.status(404).send("No person with that first name")
  }
  res.send(person)
});

app.delete("/api/people/:id", async (req, res) => {
  const id = +req.params.id;
  const person = await getPerson(id);
  if (!person) {
    res.status(404).send("No person with that id")
  }
  await deletePerson(id);
  res.status(200).send(`'Person ${id}' successfully deleted`)
});

// TODO app.put()
app.patch("/api/people/:id", async (req, res) => {
  const id = +req.params.id;
  const existingPerson = await getPerson(id);
  console.log(existingPerson)
  if (!existingPerson) {
    res.status(404).send(`No person with id ${id}`);
    return;
  }
  const personToUpdate = req.body;
  const updatedPerson = await updatePerson(id, personToUpdate)
  res.status(200).send(updatedPerson);
});

// Insert a new person
app.post("/api/people", async (req, res) => {
  //TODO: Add checks here for required fields, good data types, etc. Return 400 if bad data was submitted.
  const newPerson = {
    firstName: req.body.firstName ?? "",
    lastName: req.body.lastName ?? "",
    phone: req.body.phone ?? "",
    email: req.body.email ?? "",
    photoUrl: req.body.photoUrl ?? "",
  }
  const newPersonWithId = await addPerson(newPerson);
  res.status(201).send(newPersonWithId);
});

app.use(express.static("."));

app.listen(4000, () => console.log("Listening for HTTP requests on port 4000"));




app.post('/socks/search', async (req, res) => {
  try {
      const searchColor = req.body.color;

      const client  = MongoClient.client(url)
      const db = client.db("tse");
      const coll = db.collection("socks");
      const socks = coll.find({color: searchColor});
      return socks;

  } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Hmm, something doesn\'t smell right... Error searching for socks');
  }
});
