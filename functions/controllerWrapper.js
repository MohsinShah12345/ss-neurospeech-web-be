var _ = require("lodash");
const findWrapper = async (obj) => {
  const funName = _.keys(obj)[0];
  console.log("KeyName.....", data);
  return new Promise(async function (resolve, reject) {
    try {
      //   console.log(`Data in ${data}`);
      obj[funName].exec(function (err, res) {
        if (err) {
          console.log(`Error in ${funName}`);
          return reject({
            code: 400,
            message: `Error in ${funName}`,
            error: err,
          });
        }
        console.log(`Output in ${funName}`);
        return resolve({
          code: 200,
          message: `Response in ${funName}`,
          data: res,
        });
      });
    } catch (error) {
      console.log(`Error in ${funName}`, error);
      return reject({
        code: 500,
        message: `Error in ${funName}`,
        error,
      });
    }
  });
};
const controllerWrapper = async (obj) => {
  const functionName = _.keys(obj)[0];
  console.log("Function Name.....", functionName);
  return new Promise(async function (resolve, reject) {
    try {
      //   console.log(`Data in ${data}`);
      obj[functionName]
        .then((response) => {
          console.log(`Output in ${functionName}`, response);
          resolve({
            code: 200,
            message: obj[_.keys(obj)[1]] ?? `Response in ${functionName}`,
            data: response,
          });
        })
        .catch((err) => {
          console.log(`Error in ${err}`);
          return reject({
            code: 400,
            message: `Error in ${err}`,
            error: err,
          });
        });
    } catch (error) {
      console.log(`Error in ${functionName}`, error);
      return reject({
        code: 500,
        message: `Error in ${functionName}`,
        error,
      });
    }
  });
};
module.exports = controllerWrapper;
