const fs = require("fs");
module.exports = async (path = "/") => {
  // console.log("We are reading data from File", path);
  return new Promise((resolve, reject) => {
    fs.readFile(
      "utils/availableVoice/azureVoices.json",
      "utf8",
      (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return reject(err);
        }
        return resolve(jsonString);
      }
    );
  });
};
