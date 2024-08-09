const package = require("../models/package");
const controllerWrapper = require("../functions/controllerWrapper.js");

exports.getSingleNeuroSpeechPackage = async (req, res) => {
  try {
    const data = await package
      .findOne(
        {
          moduleName: process.env.NEURO_SPEECH,
          neuroSpeech: {
            $elemMatch: {
              _id: req.params.packageId,
            },
          },
        },
        {
          "neuroSpeech.displayName": 1,
          "neuroSpeech.packageType": 1,
          "neuroSpeech.wordsPerMonth": 1,
          "neuroSpeech.voices": 1,
          "neuroSpeech.cost": 1,
          "neuroSpeech.expiryDays": 1,
          "neuroSpeech.isActivated": 1,
          "neuroSpeech.monthly": 1,
          "neuroSpeech.biAnnual": 1,
          "neuroSpeech.lifeTime": 1,
          "neuroSpeech.custom": 1,
          "neuroSpeech.subscribedBy.$": 1,
          count: {
            $size: "$neuroSpeech.subscribedBy",
          },
        }
      )
      .populate({
        path: "neuroSpeech.subscribedBy",
        // options: {
        //   skip: (req.params.pageNo - 1) * 10,
        //   limit: 10,
        // },
      });
    if (data) {
      console.log("data.neuroSpeech[0]", data.neuroSpeech[0]);

      const package = data.neuroSpeech[0];
      return package;
    } else {
      return {};
    }
  } catch (error) {
    return error;
  }
};
exports.getSingleNeuroSpeechPackageSubscribedBy = async (req, res) => {
  try {
    const data = await package
      .findOne(
        {
          moduleName: process.env.NEURO_SPEECH,
          neuroSpeech: {
            $elemMatch: {
              _id: req.params.packageId,
            },
          },
        },
        {
          "neuroSpeech.displayName": 1,
          "neuroSpeech.packageType": 1,
          "neuroSpeech.wordsPerMonth": 1,
          "neuroSpeech.voices": 1,
          "neuroSpeech.cost": 1,
          "neuroSpeech.expiryDays": 1,
          "neuroSpeech.isActivated": 1,
          "neuroSpeech.monthly": 1,
          "neuroSpeech.biAnnual": 1,
          "neuroSpeech.lifeTime": 1,
          "neuroSpeech.custom": 1,
          "neuroSpeech.subscribedBy.$": 1,
          count: {
            $size: "$neuroSpeech.subscribedBy",
          },
        }
      )
      .populate({
        path: "neuroSpeech.subscribedBy",
        // options: {
        //   skip: (req.params.pageNo - 1) * 10,
        //   limit: 10,
        // },
      });
    if (data) {
      console.log("data.neuroSpeech[0]", data.neuroSpeech[0]);

      const { subscribedBy, ...rest } = data.neuroSpeech[0];
      const totalCount = subscribedBy.length;
      return {
        totalCount,
        subscribedBy: subscribedBy.slice(
          req.params.pageNo - 1,
          req.params.pageNo * 10
        ),
      };
    } else {
      return {};
    }
  } catch (error) {
    return error;
  }
};
exports.getSingleNeuroPostPackage = async (req, res) => {
  try {
    const data = await package.findOne({ moduleName: process.env.NEURO_POST });
    return data;
  } catch (error) {
    return error;
  }
};

exports.getNeuroPost = async (req) => {
  return await controllerWrapper({
    getNeuroPost: package.findOne(
      { moduleName: process.env.NEURO_POST },
      { _id: 1, neuroPost: 1, count: { $size: "$neuroPost" } }
    ),
    message: "NeuroPost has been fetched Successfully",
  });
};
exports.getNeuroSpeech = async (req) => {
  try {
    const data = await package.findOne(
      { moduleName: process.env.NEURO_SPEECH },
      { _id: 1, neuroSpeech: 1, count: { $size: "$neuroSpeech" } }
    );
    return data;
  } catch (error) {
    return error;
  }
};
exports.addNeuroSpeechPackage = async (req) => {
  console.log("Body.....", req.body);
  const data = await package.findOne({
    moduleName: process.env.NEURO_SPEECH,
  });

  if (data?._id) {
    const response = await package.findByIdAndUpdate(
      data._id,
      {
        $push: {
          neuroSpeech: { ...req.body.package },
        },
      },
      {
        new: true,
        projection: {
          neuroSpeech: {
            $slice: -1,
          },
        },
      }
    );
    return { message: "Package has been Added successfully" };
  } else {
    const newPackage = new package({
      moduleName: process.env.NEURO_SPEECH,
      neuroSpeech: [
        {
          ...req.body.package,
        },
      ],
    });
    const result = newPackage.save({ new: true });
    return result;
  }
};
exports.addNeuroPostPackage = async (req) => {
  console.log("Req.Body.....", req.body);

  const data = await package.findOne({
    moduleName: process.env.NEURO_POST,
  });

  if (data?._id) {
    console.log("Already Found..", data._id);
    return await controllerWrapper({
      addNeuroPostPackage: package.findByIdAndUpdate(
        data._id,
        {
          $push: {
            neuroPost: { ...req.body.package },
          },
        },
        {
          new: true,
        }
      ),
      message: "New NeuroPost Package has ben added",
    });
  } else {
    const newPackage = new package({
      moduleName: process.env.NEURO_POST,
      neuroPost: [
        {
          ...req.body.package,
        },
      ],
    });
    return await controllerWrapper({
      addNeuroPostPackage: newPackage.save(),
      message: "New NeuroPost Package has been added",
    });
  }
};
exports.addCustomNeuroSpeechPackage = async (req) => {
  console.log("Body.....", req.body);
  const data = await package.findOne({
    moduleName: process.env.NEURO_SPEECH,
  });

  if (data?._id) {
    const response = await package.findByIdAndUpdate(
      data._id,
      {
        $push: {
          neuroSpeech: { ...req.body.package },
        },
      },
      {
        new: true,
        projection: {
          neuroSpeech: {
            $slice: -1,
          },
        },
      }
    );
    return {
      message: "Custom Package has been added",
    };
  } else {
    const newPackage = new package({
      moduleName: process.env.NEURO_SPEECH,
      neuroSpeech: [
        {
          ...req.body.package,
        },
      ],
    });
    const result = newPackage.save({ new: true });
    return result;
  }
};
exports.updateNeuroSpeechPackage = async (req) => {
  console.log("Req.body....", req.body);
  const data = await package.findOneAndUpdate(
    {
      moduleName: process.env.NEURO_SPEECH,
      "neuroSpeech._id": req.body.packageId,
    },
    {
      $set: {
        "neuroSpeech.$[v]": {
          ...req.body.updatedPackage,
          _id: req.body.packageId,
        },
      },
    },
    { arrayFilters: [{ "v._id": req.body.packageId }], new: true }
  );
  return data;
};
exports.updateNeuroPostPackage = async (req) => {
  console.log("Req.body....", req.body);
  return await controllerWrapper({
    updateNeuroPostPackage: package.findOneAndUpdate(
      {
        moduleName: process.env.NEURO_POST,
        "neuroPost._id": req.body.packageId,
      },
      {
        $set: {
          "neuroPost.$[v]": {
            ...req.body.updatedPackage,
            _id: req.body.packageId,
          },
        },
      },
      { arrayFilters: [{ "v._id": req.body.packageId }], new: true }
    ),
    message: "Package has been updated in Neuro Speech",
  });
};
exports.deleteNeuroSpeechPackage = async (req) => {
  try {
    const data = await package.findOneAndUpdate(
      {
        moduleName: process.env.NEURO_SPEECH,
      },
      {
        $pull: {
          neuroSpeech: {
            _id: req.params.packageId,
          },
        },
      },
      {
        new: true,
      }
    );
    return {
      data,
      packageId: req.params.packageId,
    };
  } catch (error) {
    return error;
  }
};
exports.deleteNeuroPostPackage = async (req) => {
  try {
    const data = await package.findOneAndUpdate(
      {
        moduleName: process.env.NEURO_POST,
      },
      {
        $pull: {
          neuroPost: {
            _id: req.params.packageId,
          },
        },
      },
      {
        new: true,
      }
    );
    return { data, packageId: req.params.packageId };
  } catch (error) {
    return error;
  }
};
