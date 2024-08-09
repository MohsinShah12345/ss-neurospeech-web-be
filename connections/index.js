const pollyFunctions = require("../aws/polly");
const voiceOver = require("../models/voiceOver");

const task = require("../models/task");
module.exports = function (socket) {
  socket.on("voiceOver", async (body) => {
    console.log("Request Received", body);
    const data = await pollyFunctions.createVoiceOver(body);
    const addVoiceOver = await voiceOver.findOneAndUpdate(
      {
        userId: body.userId,
        "projects._id": body.projectId,
      },
      {
        $push: {
          "projects.$[project].voiceOversList": {
            text: body.voice.text,
            engine: data.SynthesisTask.Engine,
            languageCode: data.SynthesisTask.LanguageCode,
            lexiconNames: data.SynthesisTask.LexiconNames,
            outputFormat: data.SynthesisTask.OutputFormat,
            outputUri: data.SynthesisTask.OutputUri,
            requestCharacters: data.SynthesisTask.RequestCharacters,
            sampleRate: data.SynthesisTask.SampleRate,
            snsTopicArn: data.SynthesisTask.SnsTopicArn,
            speechMarkTypes: data.SynthesisTask.SpeechMarkTypes,
            taskId: data.SynthesisTask.TaskId,
            taskStatus: data.SynthesisTask.TaskStatus, // will change from lambda function
            taskStatusReason: data.SynthesisTask.TaskStatusReason,
            textType: data.SynthesisTask.TextType,
            voiceId: data.SynthesisTask.VoiceId,
            languageName: body.voice.LanguageName,
          },
        },
      },
      {
        new: true,
        arrayFilters: [
          {
            "project._id": body.projectId,
          },
        ],
      }
    );
    const newTask = new task({
      taskId: data.SynthesisTask.TaskId,
      userId: body.userId,
      projectId: body.projectId,
      socketId: socket.id,
    });
    await newTask.save();
  });
};
