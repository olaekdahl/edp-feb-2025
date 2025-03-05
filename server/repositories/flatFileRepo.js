// TODO: Took many shortcuts. This code should be made bulletproof.

import fs from 'fs';
const dbFileName = '../data/people.json';

// Read all people from the flat JSON file
let people;
setTimeout(async () =>                     // setTimeout defers the reading
  people = await readPeopleFromFile(), 0)  // until after the script loads.

/**
 * Retrieves all people in the DB
 * @returns {Promise<Person[]>} A promise that resolves to all people
 */
export const getPeople = async () => people;

/**
 * Finds the person with the provided id.
 * @param {number} id - The ID of the person to find.
 * @returns {Promise<Person|undefined>} A promise that resolves to the person found or undefined if no person exists with that id.
 * 
 * Attempts to convert the id to a number if possible.
 */
export const getPerson = async (id) => people.find(p => p.id === +id);

/**
 * Finds the first person in the DB with that first name
 * @param {string} firstName 
 * @returns {Promise<Person|undefined>} A promise that resolves to the person found or undefined if no person exists with that name
 */
export const getPersonByFirstName = async (firstName) =>
  people.find(p => p.firstName.toLowerCase() === firstName.toLowerCase());

/**
 * Inserts/Adds a new person to the DB
 * @param {Person} newPerson 
 * @returns {Promise<Person>} A promise that resolves to the new person added -- with their DB id!
 */
export const addPerson = async (newPerson) => {
  newPerson.id = getNextId();
  people = [...people, newPerson];
  savePeopleToFile(people);
  return newPerson;
}

/**
 * Deletes a person from the DB
 * @param {number} id The id of the person to delete
 * @returns {Promise<void>} A promise that resolves to void
 */
export const deletePerson = async (id) => {
  people = people.filter(p => p.id === id)
  savePeopleToFile(people)
}

/**
 * Updates/changes a person in the DB with the person passed in
 * @param {Person} newPerson The updated person
 * @returns {Promise<Person>} A promise that resolves to the updated person
 * 
 * newPerson must have an id. 
 */
export const updatePerson = async (newPerson) => {
  const thePerson = allPeople.find(p => p.id === newPerson.id)
  for (let prop in thePerson)
    thePerson[prop] = newPerson[prop]
  savePeopleToFile(people);
  return thePerson;
}

// Private/local functions below
const getNextId = (people) => Math.max(...people.map(p => p.id)) + 1;

const readPeopleFromFile = async () => {
  if (!fs.existsSync(dbFileName)) throw "File doesn't exist."
  const people = JSON.parse(await fs.promises.readFile(dbFileName));
  return people;
}

const savePeopleToFile = async (people) => {
  await fs.writeFile(dbFileName, JSON.stringify(people));
}