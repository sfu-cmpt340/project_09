const functions = require("firebase-functions");
const os = require("os");
const path = require("path");
const spawn = require("child-process-promise").spawn;
const cors = require("cors")({origin: true});
const busboy = require("busboy");
const fs = require("fs");

const keyFilename = "project-09-e4dd7-firebase-adminsdk-508df-4fb4827183.json";

const {Storage} = require("@google-cloud/storage");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.onFileChange = functions.storage.object().onFinalize((event) => {
  const bucket = event.bucket;
  const contentType = event.contentType;
  const filePath = event.name;

  console.log("File change detected, function execution started");

  if (event.resourceState === "not_exists") {
    console.log("We deleted a file, exit...");
    return;
  }

  if (path.basename(filePath).startsWith("resized-")) {
    console.log("We already renamed that file!");
    return;
  }
  const storage = new Storage({keyFilename: keyFilename});
  const destBucket = storage.bucket(bucket);
  const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
  const metadata = {contentType: contentType};
  return destBucket
      .file(filePath)
      .download({
        destination: tmpFilePath,
      })
      .then(() => {
        return spawn("convert",
            [tmpFilePath, "-resize", "500x500", tmpFilePath]);
      })
      .then(() => {
        return destBucket.upload(tmpFilePath, {
          destination: "resized-" + path.basename(filePath),
          metadata: metadata,
        });
      });
});

exports.uploadFile = functions.https.onRequest((req, res) => {
  console.log("starting function");
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(500).json({
        message: "Not allowed",
      });
    }
    console.log("starting upload");
    const bb = busboy({headers: req.headers});
    let uploadData = null;

    bb.on("file", (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename.filename);
      uploadData = {file: filepath, type: mimetype};
      file.pipe(fs.createWriteStream(filepath));
      console.log("on file successful");
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
  res.status(200).send("OK");
});
