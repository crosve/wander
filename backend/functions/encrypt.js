const bcrypt = require("bcrypt");
const saltRounds = 10;

const encrypt = async ({ password }) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
  }
};

const decrypt = async ({ password, hashed_password }) => {
  console.log(password, hashed_password);
  let match;
  try {
    match = await bcrypt.compare(password, hashed_password);
  } catch (error) {
    console.log("error when comparing hashed password: ", error);
  }

  return match;
};

module.exports = {
  encrypt,
  decrypt,
};
