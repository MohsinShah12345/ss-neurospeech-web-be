var AWS = require("aws-sdk");
const {
  PollyClient,
  GetSpeechSynthesisTaskCommand,
  GetSpeechSynthesisTaskCommandInput,
  StartSpeechSynthesisTaskCommand,
} = require("@aws-sdk/client-polly");
const task = require("../models/task");
const config = {
  polly: process.env.SS_AWS_POLLY_VERSION,
  region: process.env.SS_AWS_REGION,
  accessKeyId: process.env.SS_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.SS_AWS_SECRET_ACCESS_KEY,
};
var client = new PollyClient(config);
exports.createVoiceOver = async (data) => {
  var params = {
    OutputFormat: data.voice.outputFormat,
    OutputS3BucketName: process.env.SS_AWS_BUCKET_NAME,
    SampleRate: "8000",
    Text: data.voice.text,
    TextType: data.voice.textType,
    VoiceId: data.voice.voiceId,
    LanguageCode: data.voice.LanguageCode,
    Engine: data.voice.Engine || "standard",
    SnsTopicArn: process.env.SS_SNS_TOPIC_ARN,
  };
  try {
    const command = new StartSpeechSynthesisTaskCommand(params);
    const response = await client.send(command);
    console.log("inside a is", response);
    // Now here we will add new voiceOver in existing Project
    return response;
  } catch (error) {
    console.log("Error", error);
    return error;
  }
};
exports.checkTaskStatus = async (req) => {
  try {
    const command = new GetSpeechSynthesisTaskCommand({
      TaskId: req.body.taskId,
    });
    const response = await client.send(command);
    return response;
  } catch (error) {
    return error;
  }
};
exports.fetchAwsVoices = async (req) => {
  var polly = new AWS.Polly({
    polly: process.env.SS_AWS_POLLY_VERSION,
    region: process.env.SS_AWS_REGION,
    accessKeyId: process.env.SS_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.SS_AWS_SECRET_ACCESS_KEY,
  });
  var params = {
    LanguageCode: req.params.languageCode,
  }; /// paramMeter Required to get voices from Aws Polly
  return new Promise((resolve, reject) => {
    polly.describeVoices(params, function (err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        reject({
          code: 400,
          err,
        });
      } else console.log("data......", data); // successful response
      resolve({ code: 200, data });
    });
  });
};
