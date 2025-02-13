require('dotenv').config(); // Load environment variables from .env file

// Ensure required environment variables are present
const requiredVariables = ['JWT_SECRET', 'DB_URI', 'PORT'];
const missingVariables = [];

requiredVariables.forEach((variable) => {
  if (!process.env[variable]) {
    missingVariables.push(variable);
  }
});

if (missingVariables.length > 0) {
  throw new Error(`Missing required environment variables: ${missingVariables.join(', ')}`);
}

// Export a configuration object containing critical environment variables
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT || 3000, // Default to port 3000 if not specified
};