/**
 * Import the `init` helper function from the README
 * and comment out the require statements from above
 * if you want to see the results in the terminal
 */



const db = require("../models");
const {
  logger
} = require("../config/config");
const connect = require("../db/connect");
const {
  seedUsers
} = require("../db/seed");

async function init() {
  await connect();
  await seedUsers();

  const solution1 = await findUserByLastName();
  logger.debug(solution1);

  const solution2 = await findUserByEmailAndProjectFields();
  logger.debug(solution2);

  const solution3 = await getUserEmails();
  logger.debug(solution3);

  const solution4 = await getFirst3FirstNames();
  logger.debug(solution4);

  const solution5 = await getUpdatedEmail();
  logger.debug(solution5);

  const solution6 = await getRemovedUser();
  logger.debug(solution6);
}

// this executes the function when run with nodemon
//init();





/**
 * 1. Complete the code of the function to query the database
 *    and return the user with the last name of: `McGuire`
 *
 * This should return an object and not an array of a single element.
 *
 * @remember
 * Use lean and exec on the query
 */
async function findUserByLastName() {
  const user = await db.User.findOne({
    lastName: 'McGuire'
  }).lean().exec();

  return user;

}



/**
 * 2. Complete the code of the function to query the database
 *    and return the user with an email of: `cuk@boeli.gn`
 *
 *    You should use projection to only return the following fields:
 *
 *    _id, firstName, lastName, email
 *
 * This should return an object and not an array of a single element.
 *
 * @remember
 * Use lean and exec on the query
 */
async function findUserByEmailAndProjectFields() {
  const user = await db.User.findOne({
    email: 'cuk@boeli.gn'
  }).select({


    _id: 1,
    firstName: 1,
    lastName: 1,
    email: 1
  }).lean().exec();


  return user;
}

/**
 * 3. Complete the code of the function to query the database
 *    and return from all the users only their email
 *
 * This should return an array of emails only without the _ids like this
 *
 * [
 *    { email: '...' },
 *    { email: '...' },
 *     ...
 * ]
 *
 * @remember
 * Use lean and exec on the query
 */
async function getUserEmails() {


  const users = await db.User.find({}).select({
      _id: 0,
      email: 1
    })
    .lean().exec();

  return users;
}

/**
 * 4. Complete the code of the function to:
 *
 * 4.1 sort the first names using an ascending sort
 * 4.2 limit the query to only the first 3 results
 * 4.3 return an array with only the first names of each user
 *
 * This should return an array of first names only without the _ids
 *
 * [
 *    { firstName: '...' },
 *    { firstName: '...' },
 *     ...
 * ]
 *
 * @remember
 * Use lean and exec on the query
 */
async function getFirst3FirstNames() {


  const users = await db.User.find({}).select({
      firstName: 1,
      _id: 0
    })
    .sort({
      firstName: 1
    }).limit(3).lean().exec()


  return users;
}

/**
 * 5. Complete the code of the function to:
 *
 * 5.1 Search for the user with the email: "beta@houboem.py"
 * 5.2 Update the email to be: "ryanmcg@mail.com"
 * 5.3 Return the new document with the updates
 * 5.4 Return only the _id, first name, last name, email
 *
 * For this step you should comment out the following line
 * so that the document returned from the `findOneAndUpdate`
 * is converted to a regular object and not a mongoose document
 * with extra helper methods.
 *
 * This is the same as running `.lean()`
 *
 * This should return an object and not an array of a single element.
 */
async function getUpdatedEmail() {
  let user = null;


  const users = await db.User.find({
    email: "beta@houboem.py"
  })


  await db.User.findByIdAndUpdate(users[0]._id, {
    $set: {
      email: "ryanmcg@mail.com"
    },
  }).lean().exec();


  user = db.User.findOne({
    _id: users[0]._id
  }).select({
    _id: 1,
    firstName: 1,
    lastName: 1,
    email: 1
  }).lean().exec();

  // Uncomment this line after finishing the DB update query
  // user = await user.toObject();

  return user;
}

/**
 * 6. Complete the code of the function to:
 *
 * 6.1 Search for the user that speaks both 'catalan' and 'spanish'
 * 6.2 Remove it
 * 6.3 Return the removed document
 *
 * For this step you should comment out the following line
 * so that the document returned from the `findOneAndUpdate`
 * is converted to a regular object and not a mongoose document
 * with extra helper methods.
 *
 * This is the same as running `.lean()`
 */
async function getRemovedUser() {
  let user = null;



  user = await db.User.findOneAndDelete({
      speaks: ['catalan', 'spanish']
    })
    .lean().exec();


  // Uncomment this line after finishing the DB remove query
  // user = await user.toObject();

  return user;
}

module.exports = {
  findUserByLastName: findUserByLastName,
  findUserByEmailAndProjectFields: findUserByEmailAndProjectFields,
  getUserEmails: getUserEmails,
  getFirst3FirstNames: getFirst3FirstNames,
  getUpdatedEmail: getUpdatedEmail,
  getRemovedUser: getRemovedUser,
};