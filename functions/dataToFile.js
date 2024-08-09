const { json } = require("express");
const fs = require("fs");
module.exports = async (data, path = "/") => {
  // file system module to perform file operations
  console.log(data);
  console.log(path);
  // json data
  var jsonData = JSON.stringify(data);
  // '{"persons":[{"name":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]}';

  // parse json
  var jsonObj = JSON.parse(jsonData);

  // stringify JSON Object
  var jsonContent = JSON.stringify(jsonObj);

  fs.writeFile(path, jsonContent, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });
};
