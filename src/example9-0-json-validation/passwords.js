const bcrypt = require('bcrypt-nodejs');

exports.hashPassword = async password =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, null, null, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
