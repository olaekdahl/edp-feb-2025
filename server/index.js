import express from "express";
import { addPerson, deletePerson, getPeople, getPersonByFirstName, getPerson, updatePerson } from "./repositories/flatFileRepo.js";
const app = express();
app.use(express.json());

app.get("/knockknock", (req, res) => {
  res.send("Who's there?")
});

// Write a handler for a GET request for all the people at "/people"
app.get("/api/people", async (req, res) => {
  res.send(await getPeople());
})

// Write a handler for a GET request to get a person by firstName
app.get("/api/people/:id", async (req, res) => {
  const id = req.params.id;
  res.send(await getPerson(id))
})

//TODO: How to get the by firstname to be seen
// Write a handler for a GET request to get a person by firstName
app.get("/api/people/:firstname", async (req, res) => {
  const firstName = req.params.firstname;
  res.send(await getPersonByFirstName(firstName))
})

// TODO app.put()
// TODO app.post()
// TODO app.patch()

app.delete("/api/people/:id", async (req, res) => {
  const id = +req.params.id;
  await deletePerson(id);
  res.status(200).send(`'Person ${id}' successfully deleted`)
});

// Insert a new person
app.post("/api/people", async (req, res) => {
  //const newPerson = req.body;
  const newPerson = {
    firstName: req.body.firstName ?? "",
    lastName: req.body.lastName ?? "",
    phone: req.body.phone ?? "",
    email: req.body.email ?? "",
  }
  const newPersonWithId = await addPerson(newPerson);
  res.status(201).send(newPersonWithId);
});

app.use(express.static("."));

app.listen(4000, () => console.log("Listening for HTTP requests on port 4000"));
