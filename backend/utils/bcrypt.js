const bcrypt = require('bcrypt');

// Function to hash a plain-text password
async function hashPassword(password) {
  try {
    // Use a salt round of 10 for hashing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
}

// Function to compare a plain-text password with a hashed password
async function comparePassword(plainPassword, hashedPassword) {
  try {
    // Use bcrypt.compare to check if the passwords match
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
}

// Export the functions for use in the authentication logic
module.exports = {
  hashPassword,
  comparePassword,
};