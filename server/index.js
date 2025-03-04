let express = require("express");
let people = require("./people.json")

console.log(people)
const app = express();
app.use(express.json());

app.get("/knockknock", (req, res) => {
  res.send("Who's there?")
});

// Write a handler for a GET request for all the people at "/people"
app.get("/api/people", (req, res) => {
  res.send(people);
})

// Write a handler for a GET request to get a person by firstName
app.get("/api/people/:firstname", (req, res) => {
  const firstName = req.params.firstname;
  const thePerson = people.find(p => p.firstName.toLowerCase() === firstName.toLowerCase())
  res.send(thePerson)
})

// app.put()
// app.post()
// app.patch()
app.delete("/api/people/:firstname", (req, res) => {
  const firstName = req.params.firstname.toLowerCase();
  people = people.filter(p => p.firstName.toLowerCase() !== firstName);
  res.status(200).send(`'${firstName}' successfully deleted`)
})

// Insert a new person
app.post("/api/people", (req, res) => {
  const newPerson = req.body;
  people = [...people, newPerson];
  res.status(201).send();
});

app.use(express.static("."));

app.listen(4000, () => console.log("Listening for HTTP requests on port 4000"));
