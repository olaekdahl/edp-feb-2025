<img src="https://play-lh.googleusercontent.com/2A-bF1LdqB8TKZLSfC8tm2_QX47Bp_3RIdt3GqWaTXaaV673Uvt8Jf-s_2cW6mzeJQ=w480-h960-rw" alt="Logo" width="80" height="80" />

# People Picker

This is the :octocat: GitHub repo for a React project to select a person from a list of people.

This app will be used to pick a random person.

## To run the app
1. Clone the repo
1. Install the dependencies
1. Start the dev database server

## Local dev database server
1. Make sure you have MongoDB installed on your machine.
1. Create a folder under data called db.
1. Start the database server
1. First time only, reload the DB.

## Start the database server
```bash
cd data
npm run start
```  

## Reloading the database
If you ever want to reset the DB to a known state, you can run the following.
```bash
cd data
npm run reset
```