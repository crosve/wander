require("dotenv").config();

const { db } = require("../config/mongodb");

const uploadFile = ({ hashvalue }) => {
  if (hashvalue == "" || hashvalue == null) {
    return "no hash key provided";
  }
};

module.exports = {
  uploadFile,
};
