import { MongoClient, ObjectId } from 'mongodb';

// Get connection to the mongo db
const url = "mongodb://localhost:27017";

/**
 * Retrieves all people in the DB
 * @returns {Promise<Person[]>} A promise that resolves to all people
 */
export const getPeople = async () => {
  const client = await MongoClient.connect(url);
  const db = client.db("peoplepicker");
  const collection = db.collection("people");
  const data = await collection.find().toArray();
  return data;
};

/**
 * Finds the person with the provided id.
 * @param {number} id - The ID of the person to find.
 * @returns {Promise<Person|undefined>} A promise that resolves to the person found or undefined if no person exists with that id.
 * 
 * Attempts to convert the id to a number if possible.
 */
export const getPerson = async (id) => {
  const client = await MongoClient.connect(url);
  const db = client.db("peoplepicker");
  const collection = db.collection("people");
  const person = await collection.findOne({id: +id});
  return person;
};

/**
 * Finds the person with the provided ObjectId.
 * @param {string} oid - The ObjectId of the person to find.
 * @returns {Promise<Person|null>} A promise that resolves to the person found or null if no person exists with that ObjectId.
 */
export const getPersonByObjectId = async (oid) => {
  const client = await MongoClient.connect(url);
  const db = client.db("peoplepicker");
  const collection = db.collection("people");
  const person = await collection.findOne({_id: ObjectId.createFromHexString(oid)});
  return person;
};

/**
 * Finds the first person in the DB with that first name
 * @param {string} firstName 
 * @returns {Promise<Person|undefined>} A promise that resolves to the person found or undefined if no person exists with that name
 */
export const getPersonByFirstName = async (firstName) => {
  const client = await MongoClient.connect(url);
  const db = client.db("peoplepicker");
  const collection = db.collection("people");
  const person = await collection.findOne({firstName: firstName});
  return person;
};

/**
 * Inserts/Adds a new person to the DB
 * @param {Person} newPerson 
 * @returns {Promise<Person>} A promise that resolves to the new person added -- with their DB id!
 */
export const addPerson = async (newPerson) => {
  const client = await MongoClient.connect(url);
  const db = client.db("peoplepicker");
  const collection = db.collection("people");
  const result = await collection.insertOne(newPerson);
  return result;
};

/**
 * Deletes a person from the DB
 * @param {number} id The id of the person to delete
 * @returns {Promise<void>} A promise that resolves to void
 */
export const deletePerson = async (id) => {
  const client = await MongoClient.connect(url);
  const db = client.db("peoplepicker");
  const collection = db.collection("people");
  const result = await collection.deleteOne({id: +id});
  return result;
};

/**
 * Updates/changes a person in the DB with the person passed in
 * @param {Person} newPerson The updated person
 * @returns {Promise<Person>} A promise that resolves to the updated person
 * 
 * newPerson must have an id. 
 */
export const updatePerson = async (id, newPerson) => {
  const client = await MongoClient.connect(url);
  const db = client.db("peoplepicker");
  const collection = db.collection("people");
  const result = await collection.updateOne({id: +id}, {$set: newPerson});
  return result;
};
