import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: "people_picker",
  password: "postgres",
  port: 5432,
})

/**
 * Retrieves all people in the DB
 * @returns {Promise<Person[]>} A promise that resolves to all people
 */
export const getPeople = async () => {
  const result = await pool.query(`
      SELECT * 
      FROM people;
    `);
  return result.rows;
};

/**
 * Finds the person with the provided id.
 * @param {number} id - The ID of the person to find.
 * @returns {Promise<Person|undefined>} A promise that resolves to the person found or undefined if no person exists with that id.
 */
export const getPerson = async (id) => {
  const result = await pool.query(`SELECT * from people where id = $1`, id);
  if (result.rows.length === 0) return undefined;
  return result.rows[0];
};

export const getPersonByObjectId = async (id) => {
  throw new Error("not implemented");
};

/**
 * Finds the first person in the DB with that first name
 * @param {string} firstName 
 * @returns {Promise<Person|undefined>} A promise that resolves to the person found or undefined if no person exists with that name
 */
export const getPersonByFirstName = async (firstName) => {
  const result = await pool.query(`SELECT * from people where firstName = $1'`, firstName);
  if (result.rows.length === 0) return undefined;
  return result.rows;
};

/**
 * Inserts/Adds a new person to the DB
 * @param {Person} newPerson 
 * @returns {Promise<Person>} A promise that resolves to the new person added -- with their DB id!
 */
export const addPerson = async (newPerson) => {
  const { firstName, lastName, email, cell, photoUrl } = newPerson;
  const result = await pool.query(`insert into people 
    (firstName, lastName, email, cell, photoUrl) values $1, $2, $3, $4, $5`,
    firstName, lastName, email, cell, photoUrl);
  if (result.rowCount !== 1) {
    throw new Error('problem adding to Postgres DB.')
  }
  return { id: result.oid, ...newPerson };
};

/**
 * Deletes a person from the DB
 * @param {number} id The id of the person to delete
 * @returns {Promise<void>} A promise that resolves to void
 */
export const deletePerson = async (id) => {
  const result = await pool.query(`delete from people where id = '${id}'`);
  // Number of rows deleted will be in result.rowCount.
  return;
};

/**
 * Updates/changes a person in the DB with the person passed in
 * @param {Person} newPerson The updated person
 * @returns {Promise<Person>} A promise that resolves to the updated person
 * 
 * newPerson must have an id. 
 */
export const updatePerson = async (newPerson) => {
  const { id, firstName, lastName, email, cell, photoUrl } = newPerson;
  const result = await pool.query(
    `UPDATE people
      SET firstName = $1, lastName = $2, email = $3, cell = $4, photoUrl = $5
      WHERE id = $6;`,
    firstName, lastName, email, cell, photoUrl, id);
  if (result.rowCount !== 1) {  // 0 is a small problem. >1 is a BIG problem.
    throw new Error('problem updating person ${newPerson.id}.')
  }
  return { ...newPerson };
};
