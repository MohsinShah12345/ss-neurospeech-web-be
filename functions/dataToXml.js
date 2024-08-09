const { json } = require("express");
const fs = require("fs");
module.exports = async (data, path = "/") => {
  // file system module to perform file operations
  console.log(data);
  console.log(path);
  fs.writeFile(path, data, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
  });
};
