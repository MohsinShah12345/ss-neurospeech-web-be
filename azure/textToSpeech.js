var sdk = require("microsoft-cognitiveservices-speech-sdk");
function getRandomFileName() {
  var timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  var random = ("" + Math.random()).substring(2, 8);
  var random_number = timestamp + random;
  return random_number;
}
const fs = require("fs");
function xmlToString(filePath) {
  const xml = fs.readFileSync(filePath, "utf8");
  return xml;
}
async function synthesizeSpeech(_) {
  var filename = getRandomFileName().concat(".mp3");
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    process.env.SS_AZURE_SPEECH_KEY,
    process.env.SS_AZURE_SPEECH_REGION
  );
  const audioConfig = sdk.AudioConfig.fromAudioFileOutput(
    // add a conditon in which we'll check if voiceOvers folder exists , if it exists then simply add new voiceOver file init else create a new folder and then place file init
    `utils/voiceOvers/${filename}`
  );
  const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig); // text to speech
  // const ssml = await xmlToString("utils/ssml.xml");
  return new Promise((resolve, reject) => {
    synthesizer.speakSsmlAsync(
      _, // data we are reading from file
      (result) => {
        if (result) {
          // return result as stream
          synthesizer.close();
          fs.createReadStream(`utils/voiceOvers/${filename}`);
          resolve({
            code: 200,
            message: "Audio has been generated",
            data: result,
            fileName: filename,
          });
        } else {
          if (result.errorDetails) {
            console.error(result.errorDetails);
            reject({
              code: 400,
              message: "Audio can not be created",
              error: result.errorDetails,
            });
          }
        }
      },
      (error) => {
        console.log(error);
        synthesizer.close();
      }
    );
  });
}
exports.createVoiceOver = async (data) => {
  const res = await synthesizeSpeech(data);
  return res;
};
exports.getVoicesList = async (input = {}) => {
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    process.env.SS_AZURE_SPEECH_KEY,
    process.env.SS_AZURE_SPEECH_REGION
  );
  const synthesizer = new sdk.SpeechSynthesizer(speechConfig, null);
  const data = await synthesizer.getVoicesAsync();
  require("../functions/dataToFile")(
    { voices: data?.privVoices },
    "utils/availableVoice/azureVoices.json"
  );
  return data?.privVoices;
};
