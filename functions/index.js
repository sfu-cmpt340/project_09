const functions = require("firebase-functions");
const os = require("os");
const path = require("path");
const cors = require("cors")({origin: true});
const busboy = require("busboy");
const fs = require("fs");
const axios = require("axios");

const keyFilename = "project-09-e4dd7-firebase-adminsdk-508df-4fb4827183.json";

const {Storage} = require("@google-cloud/storage");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.SAM = functions.storage.object().onFinalize(async (event) => {
  const filePath = event.name;

  console.log("File change detected, function execution started");

  if (event.resourceState === "not_exists") {
    console.log("We deleted a file, exit...");
    return;
  }

  if (path.basename(filePath).startsWith("annotated_")) {
    console.log("We already renamed that file!");
    return;
  }
  try {
    // Define the path of the image in Firebase Storage
    const imagePath = filePath; // Replace with your image path

    const pythonServerUrl = `http://127.0.0.1:5000/process_and_upload?imagePath=${encodeURIComponent(imagePath)}`;

    const response = await axios.get(pythonServerUrl);

    // Handle the response from the Python server if needed
    console.log(response.data); // Log the response from the Python server

    return null;
  } catch (error) {
    console.error("Error sending GET request to Python server:", error);
    return null;
  }
});


exports.uploadFile = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(500).json({
        message: "Not allowed",
      });
    }
    const bb = busboy({headers: req.headers});
    let uploadData = null;

    bb.on("file", (fieldname, file, filename, encoding, mimetype) => {
      console.log("starting upload");
      const filepath = path.join(os.tmpdir(), filename.filename);
      uploadData = {file: filepath, type: mimetype};
      file.pipe(fs.createWriteStream(filepath));
    });

    bb.on("close", () => {
      console.log("closing");
      const storage = new Storage({keyFilename: keyFilename});
      const bucket = storage.bucket("project-09-e4dd7.appspot.com");
      bucket
          .upload(uploadData.file, {
            uploadType: "media",
            metadata: {
              metadata: {
                contentType: uploadData.type,
              },
            },
          })
          .then(() => {
            res.status(200).json({
              message: "It worked!",
            });
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
      res.send();
    });
    req.pipe(bb);
    bb.end(req.rawBody);
  });
});
