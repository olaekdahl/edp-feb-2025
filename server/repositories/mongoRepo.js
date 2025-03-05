import mongodb from 'mongodb';

// TODO: Get connection to the mongo db

// TODO: Reference to the collection(s)
// ie. const peopleCol = db.collection("people");

// TODO: Implement the methods below

/**
 * Retrieves all people in the DB
 * @returns {Promise<Person[]>} A promise that resolves to all people
 */
export const getPeople = async () => {
  throw new Error("Not implemented yet")
};

/**
 * Finds the person with the provided id.
 * @param {number} id - The ID of the person to find.
 * @returns {Promise<Person|undefined>} A promise that resolves to the person found or undefined if no person exists with that id.
 * 
 * Attempts to convert the id to a number if possible.
 */
export const getPerson = async (id) => {
  throw new Error("Not implemented yet")
};

/**
 * Finds the first person in the DB with that first name
 * @param {string} firstName 
 * @returns {Promise<Person|undefined>} A promise that resolves to the person found or undefined if no person exists with that name
 */
export const getPersonByFirstName = async (firstName) => {
  throw new Error("Not implemented yet")
};

/**
 * Inserts/Adds a new person to the DB
 * @param {Person} newPerson 
 * @returns {Promise<Person>} A promise that resolves to the new person added -- with their DB id!
 */
export const addPerson = async (newPerson) => {
  throw new Error("Not implemented yet")
};

/**
 * Deletes a person from the DB
 * @param {number} id The id of the person to delete
 * @returns {Promise<void>} A promise that resolves to void
 */
export const deletePerson = async (id) => {
  throw new Error("Not implemented yet")
};

/**
 * Updates/changes a person in the DB with the person passed in
 * @param {Person} newPerson The updated person
 * @returns {Promise<Person>} A promise that resolves to the updated person
 * 
 * newPerson must have an id. 
 */
export const updatePerson = async (newPerson) => {
  throw new Error("Not implemented yet")
};
