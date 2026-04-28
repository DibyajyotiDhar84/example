const { checkSchema } = require('express-validator'); 

const emailschema =checkSchema({
    email: {
    in: ['body'],
    isEmail: {
      errorMessage: 'Invalid email format'
    }
  },
   email: {
    in: ['body'],
    isArray: {
      errorMessage: 'must be an array of email'
    }
  },
});

module.exports = emailschema;

